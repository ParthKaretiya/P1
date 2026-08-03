/**
 * Enquiry Routes
 * Defines API routing for /api/enquiry endpoints.
 */

import express from 'express';
import { createEnquiry } from '../controllers/enquiryController.js';

const router = express.Router();

// POST /api/enquiry -> Submit new student enquiry
router.post('/', createEnquiry);

export default router;
