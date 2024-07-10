// api/controllers/formController.js
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/email');
const logger = require('../../utils/logger');

exports.submitForm = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, phone, message } = req.body;

    // Validación adicional
    if (!name || !email || !message) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Missing required fields' 
      });
    }

    // Enviar email
    await sendEmail({ name, email, phone, message });

    // Registrar la acción
    logger.info(`Form submitted by ${email}`);

    // Respuesta exitosa
    res.status(200).json({ 
      status: 'success', 
      message: 'Form submitted successfully' 
    });

  } catch (error) {
    // Manejar errores específicos
    if (error.code === 'ECONNREFUSED') {
      logger.error('Email server connection refused', error);
      return res.status(500).json({ 
        status: 'error', 
        message: 'Unable to connect to email server' 
      });
    }

    // Manejar otros errores
    logger.error('Error in form submission:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'An internal server error occurred' 
    });
  }
};