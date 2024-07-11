// src/services/ContactService.js
import { EmailService } from './emailService.js';
import { logger } from '../../utils/logger.js';

export class ContactService {
  constructor() {
    this.emailService = new EmailService();
  }

  async processContactForm({ name, email, phone, message }) {
    try {
      await this.emailService.sendContactEmail({ name, email });
      await this.emailService.sendNotificationEmail({ name, email, phone, message });
      logger.info(`Formulario de contacto procesado para ${name} (${email})`);
    } catch (error) {
      logger.error('Error procesando el formulario de contacto:', error);
      throw new Error('Error al procesar el formulario de contacto');
    }
  }
}