/**
 * Enquiry Data Model
 * Defines the Mongoose schema for student enquiries submitted to Nirayush Edutech.
 */

import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    qualification: {
      type: String,
      trim: true,
      default: 'Not Specified',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    // Automatically creates createdAt and updatedAt fields
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
