// src/controllers/contactController.js
import { ContactService } from '../services/ContactService.js';
import { logger } from '../../utils/logger.js';

export class ContactController {
  constructor() {
    this.contactService = new ContactService();
  }

  submitContactForm = async (req, res, next) => {
    try {
      const { name, email, phone, message } = req.body;

      if (!this.validateForm(name, email, message)) {
        return res.status(400).json({ error: 'Nombre, email y mensaje son campos requeridos' });
      }

      await this.contactService.processContactForm({ name, email, phone, message });

      logger.info(`Formulario de contacto enviado por ${name} (${email})`);
      res.status(200).json({ message: 'Formulario de contacto enviado con éxito' });
    } catch (error) {
      logger.error('Error en submitContactForm:', error);
      next(error);
    }
  }

  validateForm(name, email, message) {
    return name && email && message;
  }
}

// Exportar una instancia del controlador
export const contactController = new ContactController();