/**
 * Enquiry Routes
 * Defines API routing for /api/enquiry endpoints.
 */

import express from 'express';
import { createEnquiry } from '../controllers/enquiryController.js';
import { sendEnquiryEmails } from '../services/emailService.js';

const router = express.Router();

// POST /api/enquiry -> Submit new student enquiry
router.post('/', createEnquiry);

// TEMPORARY DEBUG: GET /api/enquiry/email-debug?key=... -> sends a test email synchronously
// and returns the exact SMTP result/error. REMOVE after debugging.
router.get('/email-debug', async (req, res) => {
  if (req.query.key !== 'nirayush-debug-2026') {
    return res.status(404).json({ success: false, message: 'Not found.' });
  }
  const envReport = {
    SMTP_USER: process.env.SMTP_USER || '(MISSING)',
    SMTP_PASS_length: (process.env.SMTP_PASS || '').length,
    SMTP_PASS_has_spaces: /\s/.test(process.env.SMTP_PASS || ''),
    COMPANY_EMAIL: process.env.COMPANY_EMAIL || '(MISSING - falls back to SMTP_USER)',
  };
  try {
    const results = await sendEnquiryEmails({
      name: 'Render Email Debug',
      phone: '+91 0000000000',
      email: req.query.to || process.env.COMPANY_EMAIL || process.env.SMTP_USER,
      qualification: 'Debug',
      message: 'Synchronous email debug from Render.',
      createdAt: new Date(),
    });
    return res.status(200).json({
      success: true,
      env: envReport,
      smtpResponses: results.map((r) => ({ accepted: r.accepted, rejected: r.rejected, response: r.response })),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      env: envReport,
      error: { message: err.message, code: err.code, command: err.command, responseCode: err.responseCode, response: err.response },
    });
  }
});

export default router;
