

// utils/email.js
const nodemailer = require('nodemailer');
const logger = require('../../utils/logger');
const emailConfig = require('../../../settings/email.config.js');
const { generateContactEmail, generateNotificationEmail } = require('../../../public/templates/email-templates');

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: emailConfig.auth,
});

const sendEmail = async ({ name, email, phone, message }) => {
  try {
    // Enviar correo al usuario que envía el mensaje de contacto
    const contactMailOptions = {
      from: emailConfig.from,
      to: email,
      subject: '¡Gracias por contactarnos!',
      html: generateContactEmail(name),
    };
    await transporter.sendMail(contactMailOptions);
    logger.info(`Email de contacto enviado a ${email}`);

    // Enviar correo al administrador del sitio web
    const notificationMailOptions = {
      from: emailConfig.from,
      to: emailConfig.to,
      subject: 'Nuevo mensaje de contacto',
      html: generateNotificationEmail(name, email, phone, message),
    };
    await transporter.sendMail(notificationMailOptions);
    logger.info(`Notificación de nuevo mensaje de contacto enviada a ${emailConfig.to}`);
  } catch (error) {
    logger.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;