import Enquiry from '../models/Enquiry.js';
import { sendEnquiryEmails, sendDebugEmail, verifySmtp } from '../services/emailService.js';
import { sendSuccessResponse, sendErrorResponse } from '../utils/responseHandler.js';
import { isValidEmail, isValidIndianPhone } from '../utils/common.js';

const HONEYPOT_FIELD = 'website_interests_hp';

const isHoneypotHit = (body) => {
  const value = body?.[HONEYPOT_FIELD];
  return typeof value === 'string' && value.trim().length > 0;
};

export const createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, email, qualification, message } = req.body || {};

    if (!name || !String(name).trim()) {
      return sendErrorResponse(res, 'Name is required.', 400);
    }
    if (!phone || !String(phone).trim()) {
      return sendErrorResponse(res, 'Phone number is required.', 400);
    }
    if (!isValidIndianPhone(phone)) {
      return sendErrorResponse(res, 'Enter a valid 10-digit phone number.', 400);
    }
    if (!email || !String(email).trim()) {
      return sendErrorResponse(res, 'Email address is required.', 400);
    }
    if (!isValidEmail(email)) {
      return sendErrorResponse(res, 'Please provide a valid email address.', 400);
    }
    if (!qualification || !String(qualification).trim()) {
      return sendErrorResponse(res, 'Please select your qualification.', 400);
    }
    if (message && typeof message === 'string' && message.length > 2000) {
      return sendErrorResponse(res, 'Message is too long (limit 2000 characters).', 400);
    }
    if (name && typeof name === 'string' && name.length > 120) {
      return sendErrorResponse(res, 'Name is too long.', 400);
    }
    if (qualification && typeof qualification === 'string' && qualification.length > 80) {
      return sendErrorResponse(res, 'Qualification value is too long.', 400);
    }

    const honeypotHit = isHoneypotHit(req.body);
    const enquiryData = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      qualification: String(qualification).trim(),
      message: message ? String(message).trim() : '',
      honeypotCaught: honeypotHit,
    };

    const newEnquiry = await Enquiry.create(enquiryData);

    if (honeypotHit) {
      console.warn(`[Spam Honeypot] Enquiry ${newEnquiry._id} caught by honeypot. Suppressing email.`);
      return sendSuccessResponse(res, 'Enquiry submitted successfully.', 201);
    }

    sendEnquiryEmails({
      name: newEnquiry.name,
      phone: newEnquiry.phone,
      email: newEnquiry.email,
      qualification: newEnquiry.qualification,
      message: newEnquiry.message,
      createdAt: newEnquiry.createdAt,
    })
      .then(async (emailResult) => {
        const updates = {};
        const failures = [];
        if (emailResult.delivered.includes(`company:${process.env.COMPANY_EMAIL || process.env.FROM_EMAIL}`)) {
          updates.companyEmailSent = true;
        }
        if (emailResult.delivered.includes(`student:${newEnquiry.email}`)) {
          updates.studentEmailSent = true;
        }
        if (emailResult.failed?.length) {
          for (const f of emailResult.failed) {
            failures.push({ target: f.target, error: f.error });
          }
          updates.emailFailures = failures;
        }
        if (Object.keys(updates).length) {
          try {
            await Enquiry.updateOne({ _id: newEnquiry._id }, { $set: updates });
          } catch (err) {
            console.error(`[Enquiry Controller] Failed to update email status for ${newEnquiry._id}: ${err.message}`);
          }
        }
      })
      .catch((emailError) => {
        console.error(`[Email Service Warning]: Failed to send emails for enquiry ${newEnquiry._id}: ${emailError.message}`);
      });

    return sendSuccessResponse(res, 'Enquiry submitted successfully.', 201);
  } catch (error) {
    next(error);
  }
};

export const debugSendEmail = async (req, res) => {
  const key = process.env.EMAIL_DEBUG_KEY;
  if (!key) {
    return sendErrorResponse(res, 'Email debug endpoint is disabled.', 404);
  }
  const provided = req.headers['x-debug-key'] || req.query.key;
  if (!provided || provided !== key) {
    return sendErrorResponse(res, 'Invalid or missing debug key.', 403);
  }

  const { to } = req.query || {};
  try {
    const result = await sendDebugEmail({ to });
    return sendSuccessResponse(res, 'Debug email dispatched.', 200, {
      verification: result.verification,
      recipient: result.recipient,
      info: result.info,
    });
  } catch (err) {
    return sendErrorResponse(res, `Debug email failed: ${err.message || String(err)}`, 500);
  }
};

export const debugVerifySmtp = async (req, res) => {
  const key = process.env.EMAIL_DEBUG_KEY;
  if (!key) {
    return sendErrorResponse(res, 'Email debug endpoint is disabled.', 404);
  }
  const provided = req.headers['x-debug-key'] || req.query.key;
  if (!provided || provided !== key) {
    return sendErrorResponse(res, 'Invalid or missing debug key.', 403);
  }

  try {
    const verification = await verifySmtp();
    return sendSuccessResponse(res, verification.ok ? 'SMTP verification OK.' : 'SMTP verification failed.', 200, {
      verification,
    });
  } catch (err) {
    return sendErrorResponse(res, `SMTP verify error: ${err.message || String(err)}`, 500);
  }
};
