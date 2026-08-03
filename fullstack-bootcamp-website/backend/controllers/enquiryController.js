/**
 * Enquiry Controller
 * Handles incoming HTTP requests related to student enquiries.
 */

import Enquiry from '../models/Enquiry.js';
import { sendEnquiryEmails } from '../services/emailService.js';
import { sendSuccessResponse, sendErrorResponse } from '../utils/responseHandler.js';

/**
 * @desc    Submit a new enquiry
 * @route   POST /api/enquiry
 * @access  Public
 */
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, email, qualification, message } = req.body;

    // 1. Field Validation
    if (!name || !name.trim()) {
      return sendErrorResponse(res, 'Name is required.', 400);
    }
    if (!phone || !phone.trim()) {
      return sendErrorResponse(res, 'Phone number is required.', 400);
    }
    if (!email || !email.trim()) {
      return sendErrorResponse(res, 'Email address is required.', 400);
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return sendErrorResponse(res, 'Please provide a valid email address.', 400);
    }

    // 2. Save Enquiry to MongoDB
    const newEnquiry = await Enquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      qualification: qualification ? qualification.trim() : 'Not Specified',
      message: message ? message.trim() : '',
    });

    // 3. Send automated emails in background (INSTANT response to user)
    sendEnquiryEmails({
      name: newEnquiry.name,
      phone: newEnquiry.phone,
      email: newEnquiry.email,
      qualification: newEnquiry.qualification,
      message: newEnquiry.message,
      createdAt: newEnquiry.createdAt,
    }).catch((emailError) => {
      console.error(`[Email Service Warning]: Failed to send emails: ${emailError.message}`);
    });

    // 4. Return Success JSON Response
    return sendSuccessResponse(res, 'Enquiry submitted successfully.', 201);
  } catch (error) {
    // Pass unexpected errors to global error handling middleware
    next(error);
  }
};
