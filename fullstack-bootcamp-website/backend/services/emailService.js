import nodemailer from 'nodemailer';
import { escapeHtml, sleep } from '../utils/common.js';

const RETRYABLE_CODES = new Set([
  'ECONNRESET',
  'ETIMEDOUT',
  'ECONNREFUSED',
  'ESOCKET',
  'EAI_AGAIN',
  'ENOTFOUND',
]);

const isRetryableError = (err) => {
  if (!err) return false;
  if (RETRYABLE_CODES.has(err.code)) return true;
  if (RETRYABLE_CODES.has(err.errno)) return true;
  const msg = (err.message || '').toLowerCase();
  const status = Number(err.responseCode || err.status || 0);
  if (status >= 400 && status < 500) return false;
  if (status >= 500) return true;
  if (/timeout|timed out|temporary|try again later|connection|socket|econn|eai|enotfound/.test(msg)) {
    return true;
  }
  return false;
};

const withRetry = async (fn, { retries = 3, initialDelayMs = 1000 } = {}) => {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn(attempt + 1);
    } catch (err) {
      lastError = err;
      const isLast = attempt === retries;
      if (isLast || !isRetryableError(err)) throw err;
      const delay = initialDelayMs * 2 ** attempt;
      console.warn(
        `[Email Retry] Transient error on attempt ${attempt + 1}/${retries + 1}: ${
          err.message
        }. Retrying in ${delay}ms.`
      );
      await sleep(delay);
    }
  }
  throw lastError;
};

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });

const verifyTransporter = async (transporter) => {
  try {
    const ok = await transporter.verify();
    return { ok, error: null };
  } catch (err) {
    return { ok: false, error: err.message || String(err) };
  }
};

const buildEnquiryContext = (enquiryDetails) => {
  const {
    name = '',
    phone = '',
    email = '',
    qualification = 'Not Specified',
    message = 'No message provided.',
    createdAt,
  } = enquiryDetails || {};

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeQualification = escapeHtml(qualification || 'Not Specified');
  const safeMessage = escapeHtml(message || 'No message provided.');

  const formattedDate = new Date(createdAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return {
    raw: { name, phone, email, qualification, message },
    safe: {
      name: safeName,
      phone: safePhone,
      email: safeEmail,
      qualification: safeQualification,
      message: safeMessage,
    },
    formattedDate,
  };
};

const createCompanyMailOptions = (fromEmail, companyEmail, context) => {
  const { safe, formattedDate, raw } = context;
  return {
    from: `"Nirayush Edutech Portal" <${fromEmail}>`,
    replyTo: raw.email,
    to: companyEmail,
    subject: `New Enquiry Received — ${raw.name}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Enquiry Received</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;letter-spacing:3px;color:#a0c4ff;text-transform:uppercase;font-weight:600;">Nirayush Edutech</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">New Student Enquiry</h1>
              <p style="margin:10px 0 0 0;font-size:13px;color:#90b8e0;">Received via Website Portal</p>
            </td>
          </tr>
          <tr>
            <td style="background:#e8f4fd;padding:14px 40px;border-bottom:1px solid #d0e8f5;">
              <p style="margin:0;font-size:14px;color:#0f3460;font-weight:600;">
                A prospective student has submitted an enquiry. Please follow up within <strong>24 hours</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px 0;font-size:15px;color:#444;line-height:1.6;">
                Dear Team,<br/><br/>
                A new admission enquiry has been received through the Nirayush Edutech website. The details of the prospective student are listed below.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr style="background:#0f3460;">
                  <td colspan="2" style="padding:12px 18px;">
                    <p style="margin:0;font-size:12px;font-weight:700;color:#a0c4ff;letter-spacing:2px;text-transform:uppercase;">Student Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;width:35%;border-bottom:1px solid #e2e8f0;">Full Name</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${safe.name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">Phone Number</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${safe.phone}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">Email Address</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${safe.email}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">Qualification</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${safe.qualification}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">Message</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;line-height:1.6;border-bottom:1px solid #e2e8f0;">${safe.message}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;">Date &amp; Time</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;">${escapeHtml(formattedDate)}</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:6px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:14px;color:#92400e;font-weight:600;">Action Required</p>
                    <p style="margin:6px 0 0 0;font-size:13px;color:#78350f;line-height:1.5;">
                      Please contact <strong>${safe.name}</strong> at <strong>${safe.phone}</strong> or <strong>${safe.email}</strong> within 24 hours to provide admission counselling and course information.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#888;">This is an automated notification from the <strong>Nirayush Edutech</strong> website portal.</p>
              <p style="margin:6px 0 0 0;font-size:12px;color:#aaa;">Please do not reply to this email. Use the student contact details above.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    text: `NEW STUDENT ENQUIRY — NIRAYUSH EDUTECH
=======================================

Dear Team,

A new admission enquiry has been received via the website portal. Please follow up within 24 hours.

STUDENT DETAILS:
  Full Name     : ${raw.name}
  Phone Number  : ${raw.phone}
  Email Address : ${raw.email}
  Qualification : ${raw.qualification || 'Not Specified'}
  Message       : ${raw.message || 'No message provided.'}
  Date & Time   : ${formattedDate}

ACTION REQUIRED:
  Contact ${raw.name} at ${raw.phone} or ${raw.email} to provide admission counselling.

---
This is an automated notification from the Nirayush Edutech website portal.`,
  };
};

const createStudentMailOptions = (fromEmail, context) => {
  const { safe, formattedDate, raw } = context;
  return {
    from: `"Nirayush Edutech" <${fromEmail}>`,
    to: raw.email,
    subject: `Thank You for Your Enquiry — Nirayush Edutech`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You — Nirayush Edutech</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);padding:40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;letter-spacing:3px;color:#a0c4ff;text-transform:uppercase;font-weight:600;">Nirayush Edutech</p>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">Thank You, ${safe.name}!</h1>
              <p style="margin:12px 0 0 0;font-size:14px;color:#90b8e0;">We have received your enquiry successfully.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#e8f5e9;padding:16px 40px;text-align:center;border-bottom:1px solid #c8e6c9;">
              <p style="margin:0;font-size:15px;color:#2e7d32;font-weight:600;">
                Your enquiry has been registered with us.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px 0;font-size:15px;color:#333;line-height:1.7;">
                Dear <strong>${safe.name}</strong>,
              </p>
              <p style="margin:0 0 16px 0;font-size:15px;color:#444;line-height:1.7;">
                Thank you for reaching out to <strong>Nirayush Edutech</strong>. We are delighted to hear from you and truly appreciate your interest in our programs.
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;color:#444;line-height:1.7;">
                Our dedicated admission counsellor will get in touch with you within <strong>24 working hours</strong> to guide you through the available courses, eligibility criteria, and next steps in the enrollment process.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faff;border-radius:8px;border:1px solid #e0e8f5;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px 0;font-size:13px;font-weight:700;color:#0f3460;letter-spacing:1.5px;text-transform:uppercase;">What Happens Next?</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          Our counsellor will call you at <strong>${safe.phone}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          We will share detailed course information and fee structure
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          You will receive guidance on eligibility and batch schedules
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          Begin your journey to a successful IT career!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                <tr style="background:#0f3460;">
                  <td colspan="2" style="padding:12px 18px;">
                    <p style="margin:0;font-size:12px;font-weight:700;color:#a0c4ff;letter-spacing:2px;text-transform:uppercase;">Your Enquiry Summary</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;font-size:13px;color:#666;background:#f8fafc;width:40%;border-bottom:1px solid #e2e8f0;font-weight:600;">Qualification</td>
                  <td style="padding:12px 18px;font-size:13px;color:#333;border-bottom:1px solid #e2e8f0;">${safe.qualification}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;font-size:13px;color:#666;background:#f8fafc;font-weight:600;">Your Message</td>
                  <td style="padding:12px 18px;font-size:13px;color:#333;line-height:1.5;">${safe.message}</td>
                </tr>
              </table>
              <p style="margin:0 0 6px 0;font-size:15px;color:#333;line-height:1.7;">
                If you have any immediate questions, feel free to call or WhatsApp us at <strong>+91 90541 17266</strong>.
              </p>
              <p style="margin:16px 0 0 0;font-size:15px;color:#333;">
                Warm regards,<br/>
                <strong style="color:#0f3460;">The Admissions Team</strong><br/>
                <span style="color:#666;font-size:13px;">Nirayush Edutech</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#0f3460;padding:20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#a0c4ff;text-align:center;">
                    Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#a0c4ff;text-align:center;padding-top:6px;">
                    +91 90541 17266 &nbsp;|&nbsp; Mon–Sat: 9:00 AM – 7:00 PM
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;">This is an automated confirmation email. Please do not reply to this message.</p>
              <p style="margin:6px 0 0 0;font-size:12px;color:#bbb;">&copy; ${new Date().getFullYear()} Nirayush Edutech. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    text: `Dear ${raw.name},

Thank you for reaching out to Nirayush Edutech. We are delighted to hear from you and appreciate your interest in our programs.

Your enquiry has been successfully registered with us.

Our dedicated admission counsellor will get in touch with you at ${raw.phone} within 24 working hours to guide you through available courses, eligibility criteria, fees, and next steps in the enrollment process.

YOUR ENQUIRY SUMMARY:
  Qualification : ${raw.qualification || 'Not Specified'}
  Your Message  : ${raw.message || 'No message provided.'}

For any immediate assistance, feel free to call or WhatsApp us at +91 90541 17266 (Mon–Sat: 9:00 AM – 7:00 PM).

Warm regards,
The Admissions Team
Nirayush Edutech
Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421

---
This is an automated confirmation. Please do not reply to this email.`,
  };
};

export const sendEnquiryEmails = async (enquiryDetails) => {
  const context = buildEnquiryContext(enquiryDetails);
  const companyEmail = process.env.COMPANY_EMAIL || process.env.FROM_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

  if (!fromEmail) {
    throw new Error('FROM_EMAIL / SMTP_USER not configured. Cannot send emails.');
  }
  if (!companyEmail) {
    throw new Error('COMPANY_EMAIL not configured. Cannot send company notification.');
  }

  const transporter = createTransporter();

  const companyMailOptions = createCompanyMailOptions(fromEmail, companyEmail, context);
  const studentMailOptions = createStudentMailOptions(fromEmail, context);

  const sendCompany = () =>
    withRetry(() => transporter.sendMail(companyMailOptions), { retries: 2, initialDelayMs: 1500 });
  const sendStudent = () =>
    withRetry(() => transporter.sendMail(studentMailOptions), { retries: 2, initialDelayMs: 1500 });

  const [companyResult, studentResult] = await Promise.allSettled([sendCompany(), sendStudent()]);

  const ok = [];
  const failed = [];

  if (companyResult.status === 'fulfilled') {
    ok.push(`company:${companyEmail}`);
    console.log(`[Email Success]: Notification delivered to company (${companyEmail}).`);
  } else {
    failed.push({ target: `company:${companyEmail}`, error: companyResult.reason?.message || String(companyResult.reason) });
    console.error(
      `[Email Delivery Error]: Failed to notify company (${companyEmail}): ${
        companyResult.reason?.message || companyResult.reason
      }`
    );
  }

  if (studentResult.status === 'fulfilled') {
    ok.push(`student:${context.raw.email}`);
    console.log(`[Email Success]: Thank-you delivered to student (${context.raw.email}).`);
  } else {
    failed.push({ target: `student:${context.raw.email}`, error: studentResult.reason?.message || String(studentResult.reason) });
    console.error(
      `[Email Delivery Error]: Failed to send thank-you to student (${context.raw.email}): ${
        studentResult.reason?.message || studentResult.reason
      }`
    );
  }

  return {
    success: failed.length === 0,
    delivered: ok,
    failed: failed.map((f) => ({ target: f.target, error: f.error })),
  };
};

export const sendDebugEmail = async ({ to } = {}) => {
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  if (!fromEmail) throw new Error('FROM_EMAIL / SMTP_USER not configured.');
  const recipient = to || process.env.COMPANY_EMAIL;
  if (!recipient) throw new Error('No recipient available for debug email.');

  const transporter = createTransporter();
  const verification = await verifyTransporter(transporter);

  const subject = 'Nirayush Edutech — Email Debug Test';
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${subject}</title>
</head>
<body>
  <h1>${subject}</h1>
  <p>Time: <code>${escapeHtml(new Date().toISOString())}</code></p>
  <p>SMTP host: <code>${escapeHtml(process.env.SMTP_HOST || 'smtp-relay.brevo.com')}</code></p>
  <p>Port: <code>${escapeHtml(String(Number(process.env.SMTP_PORT) || 587))}</code></p>
  <p>SMTP user: <code>${escapeHtml(process.env.SMTP_USER || '')}</code></p>
  <p>From: <code>${escapeHtml(fromEmail)}</code></p>
  <p>Transporter verified: <code>${verification.ok ? 'yes' : 'no'}</code></p>
  ${verification.error ? `<p>Verify error: <code>${escapeHtml(verification.error)}</code></p>` : ''}
  <p>If you see this email, your SMTP configuration is working correctly.</p>
</body>
</html>`;

  const info = await transporter.sendMail({
    from: `"Nirayush Edutech Portal" <${fromEmail}>`,
    to: recipient,
    subject,
    html,
  });

  return {
    verification,
    recipient,
    info: { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response || null },
  };
};

export const verifySmtp = async () => verifyTransporter(createTransporter());
