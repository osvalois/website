// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ name, email, phone, message }) => {
  await transporter.sendMail({
    from: `"Form Submission" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Form Submission Confirmation',
    text: `Thank you for your submission, ${name}. We received the following message: ${message}`,
    html: `<p>Thank you for your submission, ${name}. We received the following message: ${message}</p>`,
  });
};

module.exports = sendEmail;
