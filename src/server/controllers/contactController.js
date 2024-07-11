// src/controllers/contactController.js
import { ContactService } from '../services/ContactService.js';
import { logger } from '../../utils/logger.js';
import fetch from 'node-fetch';

export class ContactController {
  constructor() {
    this.contactService = new ContactService();
  }

  submitContactForm = async (req, res, next) => {
    try {
      const { name, email, phone, message, 'cf-turnstile-response': cfTurnstileResponse } = req.body;

      if (!this.validateForm(name, email, message)) {
        return res.status(400).json({ error: 'Nombre, email y mensaje son campos requeridos' });
      }

      // Verificar si la solicitud proviene del mismo sitio
      const isSameSite = this.checkIfSameSite(req);

      if (!isSameSite) {
        // Si no es del mismo sitio, verificar CAPTCHA
        if (!cfTurnstileResponse) {
          return res.status(400).json({ error: 'Verificación CAPTCHA requerida' });
        }

        const isValidCaptcha = await this.verifyCaptcha(cfTurnstileResponse, req.ip);
        if (!isValidCaptcha) {
          return res.status(400).json({ error: 'Verificación CAPTCHA fallida' });
        }
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

  checkIfSameSite(req) {
    const origin = req.get('Origin');
    const referer = req.get('Referer');
    
    // Usa los orígenes permitidos de tu configuración CORS
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    return allowedOrigins.some(domain => origin === domain || referer?.startsWith(domain));
  }

  async verifyCaptcha(token, remoteip) {
    const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: remoteip
      })
    });

    const data = await response.json();
    return data.success;
  }
}

// Exportar una instancia del controlador
export const contactController = new ContactController();