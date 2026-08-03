/**
 * Email Service Module
 * Handles sending automated notification emails to company staff and thank-you emails to prospective students.
 */

import nodemailer from 'nodemailer';

/**
 * Creates and returns a Nodemailer SMTP Transporter instance using environment variables.
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
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

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. ENQUIRY NOTIFICATION EMAIL — sent to company staff
  // ─────────────────────────────────────────────────────────────────────────────
  const companyMailOptions = {
    from: `"Nirayush Edutech Portal" <${process.env.SMTP_USER}>`,
    to: companyEmail,
    subject: `📋 New Enquiry Received — ${name}`,
    html: `
<!DOCTYPE html>
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

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;letter-spacing:3px;color:#a0c4ff;text-transform:uppercase;font-weight:600;">Nirayush Edutech</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">New Student Enquiry</h1>
              <p style="margin:10px 0 0 0;font-size:13px;color:#90b8e0;">Received via Website Portal</p>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background:#e8f4fd;padding:14px 40px;border-bottom:1px solid #d0e8f5;">
              <p style="margin:0;font-size:14px;color:#0f3460;font-weight:600;">
                &#128276; A prospective student has submitted an enquiry. Please follow up within <strong>24 hours</strong>.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px 0;font-size:15px;color:#444;line-height:1.6;">
                Dear Team,<br/><br/>
                A new admission enquiry has been received through the Nirayush Edutech website. The details of the prospective student are listed below.
              </p>

              <!-- Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr style="background:#0f3460;">
                  <td colspan="2" style="padding:12px 18px;">
                    <p style="margin:0;font-size:12px;font-weight:700;color:#a0c4ff;letter-spacing:2px;text-transform:uppercase;">Student Details</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;width:35%;border-bottom:1px solid #e2e8f0;">&#128100; Full Name</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">&#128222; Phone Number</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">&#128231; Email Address</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">&#127891; Qualification</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #e2e8f0;">${qualification || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;border-bottom:1px solid #e2e8f0;">&#128172; Message</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;line-height:1.6;border-bottom:1px solid #e2e8f0;">${message || 'No message provided.'}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:13px;font-weight:700;color:#555;background:#f8fafc;">&#128197; Date &amp; Time</td>
                  <td style="padding:14px 18px;font-size:14px;color:#1a1a2e;font-weight:600;">${formattedDate}</td>
                </tr>
              </table>

              <!-- Action Reminder -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:6px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:14px;color:#92400e;font-weight:600;">&#9888;&#65039; Action Required</p>
                    <p style="margin:6px 0 0 0;font-size:13px;color:#78350f;line-height:1.5;">
                      Please contact <strong>${name}</strong> at <strong>${phone}</strong> or <strong>${email}</strong> within 24 hours to provide admission counselling and course information.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#888;">This is an automated notification from the <strong>Nirayush Edutech</strong> website portal.</p>
              <p style="margin:6px 0 0 0;font-size:12px;color:#aaa;">Please do not reply to this email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `
NEW STUDENT ENQUIRY — NIRAYUSH EDUTECH
=======================================

Dear Team,

A new admission enquiry has been received via the website portal. Please follow up within 24 hours.

STUDENT DETAILS:
  Full Name     : ${name}
  Phone Number  : ${phone}
  Email Address : ${email}
  Qualification : ${qualification || 'Not Specified'}
  Message       : ${message || 'No message provided.'}
  Date & Time   : ${formattedDate}

ACTION REQUIRED:
  Contact ${name} at ${phone} or ${email} to provide admission counselling.

---
This is an automated notification from the Nirayush Edutech website portal.
    `.trim(),
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. THANK YOU EMAIL — sent to the student
  // ─────────────────────────────────────────────────────────────────────────────
  const studentMailOptions = {
    from: `"Nirayush Edutech" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Thank You for Your Enquiry — Nirayush Edutech`,
    html: `
<!DOCTYPE html>
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

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);padding:40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:13px;letter-spacing:3px;color:#a0c4ff;text-transform:uppercase;font-weight:600;">Nirayush Edutech</p>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">Thank You, ${name}!</h1>
              <p style="margin:12px 0 0 0;font-size:14px;color:#90b8e0;">We have received your enquiry successfully.</p>
            </td>
          </tr>

          <!-- Confirmation Badge -->
          <tr>
            <td style="background:#e8f5e9;padding:16px 40px;text-align:center;border-bottom:1px solid #c8e6c9;">
              <p style="margin:0;font-size:15px;color:#2e7d32;font-weight:600;">
                &#9989; Your enquiry has been registered with us.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px 0;font-size:15px;color:#333;line-height:1.7;">
                Dear <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 16px 0;font-size:15px;color:#444;line-height:1.7;">
                Thank you for reaching out to <strong>Nirayush Edutech</strong>. We are delighted to hear from you and truly appreciate your interest in our programs.
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;color:#444;line-height:1.7;">
                Our dedicated admission counsellor will get in touch with you within <strong>24 working hours</strong> to guide you through the available courses, eligibility criteria, and next steps in the enrollment process.
              </p>

              <!-- What to Expect -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faff;border-radius:8px;border:1px solid #e0e8f5;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 14px 0;font-size:13px;font-weight:700;color:#0f3460;letter-spacing:1.5px;text-transform:uppercase;">What Happens Next?</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          &#128222;&nbsp; Our counsellor will call you at <strong>${phone}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          &#128203;&nbsp; We will share detailed course information and fee structure
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          &#127891;&nbsp; You will receive guidance on eligibility and batch schedules
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:14px;color:#444;line-height:1.5;">
                          &#128640;&nbsp; Begin your journey to a successful IT career!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Enquiry Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                <tr style="background:#0f3460;">
                  <td colspan="2" style="padding:12px 18px;">
                    <p style="margin:0;font-size:12px;font-weight:700;color:#a0c4ff;letter-spacing:2px;text-transform:uppercase;">Your Enquiry Summary</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;font-size:13px;color:#666;background:#f8fafc;width:40%;border-bottom:1px solid #e2e8f0;font-weight:600;">Qualification</td>
                  <td style="padding:12px 18px;font-size:13px;color:#333;border-bottom:1px solid #e2e8f0;">${qualification || 'Not Specified'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;font-size:13px;color:#666;background:#f8fafc;font-weight:600;">Your Message</td>
                  <td style="padding:12px 18px;font-size:13px;color:#333;line-height:1.5;">${message || 'No message provided.'}</td>
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

          <!-- Contact Info Bar -->
          <tr>
            <td style="background:#0f3460;padding:20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#a0c4ff;text-align:center;">
                    &#128205; Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421
                  </td>
                </tr>
                <tr>
                  <td style="font-size:12px;color:#a0c4ff;text-align:center;padding-top:6px;">
                    &#128222; +91 90541 17266 &nbsp;|&nbsp; &#9200; Mon–Sat: 9:00 AM – 7:00 PM
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
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
</html>
    `,
    text: `
Dear ${name},

Thank you for reaching out to Nirayush Edutech. We are delighted to hear from you and appreciate your interest in our programs.

Your enquiry has been successfully registered with us.

Our dedicated admission counsellor will get in touch with you at ${phone} within 24 working hours to guide you through available courses, eligibility criteria, fees, and next steps in the enrollment process.

YOUR ENQUIRY SUMMARY:
  Qualification : ${qualification || 'Not Specified'}
  Your Message  : ${message || 'No message provided.'}

For any immediate assistance, feel free to call or WhatsApp us at +91 90541 17266 (Mon–Sat: 9:00 AM – 7:00 PM).

Warm regards,
The Admissions Team
Nirayush Edutech
Skyleaf, Shop No. 01, Near Sardardham, Khodiyar, Ahmedabad – 382421

---
This is an automated confirmation. Please do not reply to this email.
    `.trim(),
  };

  // Send both emails concurrently
  try {
    const results = await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(studentMailOptions),
    ]);
    console.log(`[Email Success]: Delivered notification to company (${companyEmail}) and thank-you to student (${email}).`);
    return results;
  } catch (err) {
    console.error(`[Email Delivery Error]: ${err.message}`);
    throw err;
  }
};
