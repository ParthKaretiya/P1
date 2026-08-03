/**
 * Email Service Module
 * Handles sending automated notification emails to company staff and thank-you emails to prospective students.
 */

import nodemailer from 'nodemailer';

/**
 * Creates and returns a Nodemailer SMTP Transporter instance using environment variables.
 */
const createTransporter = () => {
  if (process.env.SMTP_HOST === 'smtp.gmail.com' || !process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Sends notification email to Company and Thank You email to Student.
 * 
 * @param {Object} enquiryDetails - The enquiry details object containing name, phone, email, qualification, message, createdAt.
 */
export const sendEnquiryEmails = async (enquiryDetails) => {
  const { name, phone, email, qualification, message, createdAt } = enquiryDetails;
  const companyEmail = process.env.COMPANY_EMAIL || process.env.SMTP_USER;
  const formattedDate = new Date(createdAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const transporter = createTransporter();

  // 1. Email Template for Company Staff
  const companyMailOptions = {
    from: `"Nirayush Edutech Portal" <${process.env.SMTP_USER}>`,
    to: companyEmail,
    subject: 'New Enquiry Received',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #0d6efd; border-bottom: 2px solid #0d6efd; padding-bottom: 8px;">New Enquiry Received</h2>
        <p>A new student enquiry has been submitted through the website portal.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f8f9fa; width: 30%;">Name:</td>
            <td style="padding: 8px; background: #ffffff;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f8f9fa;">Phone:</td>
            <td style="padding: 8px; background: #ffffff;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f8f9fa;">Email:</td>
            <td style="padding: 8px; background: #ffffff;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f8f9fa;">Qualification:</td>
            <td style="padding: 8px; background: #ffffff;">${qualification || 'Not Specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f8f9fa;">Message:</td>
            <td style="padding: 8px; background: #ffffff;">${message || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; background: #f8f9fa;">Date & Time:</td>
            <td style="padding: 8px; background: #ffffff;">${formattedDate}</td>
          </tr>
        </table>
      </div>
    `,
    text: `
New Enquiry Received

Name: ${name}
Phone: ${phone}
Email: ${email}
Qualification: ${qualification || 'Not Specified'}
Message: ${message || 'N/A'}
Date & Time: ${formattedDate}
    `,
  };

  // 2. Email Template for Student
  const studentMailOptions = {
    from: `"Nirayush Edutech" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Thank You for Contacting Nirayush Edutech',
    text: `Hello ${name},\n\nThank you for contacting Nirayush Edutech.\n\nWe have received your enquiry successfully.\n\nOur admission counsellor will contact you within 24 hours.\n\nRegards,\nNirayush Edutech`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #222; line-height: 1.6;">
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for contacting <strong>Nirayush Edutech</strong>.</p>
        <p>We have received your enquiry successfully.</p>
        <p>Our admission counsellor will contact you within 24 hours.</p>
        <br />
        <p>Regards,<br /><strong>Nirayush Edutech</strong></p>
      </div>
    `,
  };

  // Send both emails concurrently
  await Promise.all([
    transporter.sendMail(companyMailOptions),
    transporter.sendMail(studentMailOptions),
  ]);
};
