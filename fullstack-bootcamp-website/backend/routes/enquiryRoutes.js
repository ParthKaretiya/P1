import express from 'express';
import { createEnquiry, debugSendEmail, debugVerifySmtp } from '../controllers/enquiryController.js';
import { enquiryLimiter, debugLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/', enquiryLimiter, createEnquiry);
router.get('/email-debug', debugLimiter, debugSendEmail);
router.get('/smtp-verify', debugLimiter, debugVerifySmtp);

export default router;
