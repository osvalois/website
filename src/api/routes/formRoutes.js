// api/routes/formRoutes.js

const express = require('express');
const { body } = require('express-validator');
const formController = require('../controllers/formController');
const rateLimiter = require('../../middlewares/rateLimiter');
const { asyncHandler } = require('../../utils/asyncHandler');

const router = express.Router();

// Validación del formulario
const validateForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .optional()
    .isMobilePhone().withMessage('Invalid phone number'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
];

// Ruta para enviar el formulario
router.post(
  '/submit',
  rateLimiter({ 
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5 // limitar a 5 intentos por ventana por IP
  }),
  validateForm,
  asyncHandler(formController.submitForm)
);
module.exports = router;