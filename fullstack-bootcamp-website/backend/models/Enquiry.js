import mongoose from 'mongoose';

const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [120, 'Name is too long.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [PHONE_REGEX, 'Phone number must be a valid 10-digit number.'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email is too long.'],
      validate: {
        validator: (v) => EMAIL_REGEX.test(v),
        message: 'Please provide a valid email address.',
      },
    },
    qualification: {
      type: String,
      trim: true,
      required: [true, 'Qualification selection is required.'],
      default: 'Not Specified',
      maxlength: [80, 'Qualification value is too long.'],
    },
    message: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2000, 'Message is too long (limit 2000 characters).'],
    },
    companyEmailSent: {
      type: Boolean,
      default: false,
    },
    studentEmailSent: {
      type: Boolean,
      default: false,
    },
    emailFailures: [
      {
        target: { type: String },
        error: { type: String },
        at: { type: Date, default: Date.now },
      },
    ],
    honeypotCaught: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
