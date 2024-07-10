// middlewares/rateLimiter.js

const rateLimit = require('express-rate-limit');

/**
 * Crea un middleware de limitación de tasa.
 * @param {Object} options Opciones para el limitador de tasa
 * @param {number} options.windowMs Ventana de tiempo en milisegundos
 * @param {number} options.max Número máximo de solicitudes permitidas en la ventana de tiempo
 * @returns {Function} Middleware de express-rate-limit
 */
const rateLimiter = ({ windowMs, max }) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      status: 'error',
      message: 'Too many requests, please try again later.'
    },
    standardHeaders: true, // Devuelve los headers estándar de limitación de tasa `RateLimit-*`
    legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
    handler: (req, res, next, options) => {
      res.status(options.statusCode).json(options.message);
    }
  });
};

module.exports = rateLimiter;