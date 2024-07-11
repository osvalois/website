// src/services/EmailService.js
import nodemailer from 'nodemailer';
import { emailConfig } from '../settings/emailSettings.js';
import { generateContactEmail, generateNotificationEmail } from '../../../public/templates/EmailTemplates.js';
import { logger } from '../../utils/logger.js';

export class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig);
  }

  async sendContactEmail({ name, email }) {
    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: '¡Gracias por contactarnos!',
      html: generateContactEmail(name),
    };
    await this.sendMail(mailOptions);
    logger.info(`Email de contacto enviado a ${email}`);
  }

  async sendNotificationEmail({ name, email, phone, message }) {
    const mailOptions = {
      from: emailConfig.from,
      to: emailConfig.to,
      subject: 'Nuevo mensaje de contacto',
      html: generateNotificationEmail(name, email, phone, message),
    };
    await this.sendMail(mailOptions);
    logger.info(`Notificación de nuevo mensaje de contacto enviada a ${emailConfig.to}`);
  }

  async sendMail(mailOptions) {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      logger.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}