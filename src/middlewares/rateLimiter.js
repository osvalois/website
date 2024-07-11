// middlewares/rateLimiter.js

import rateLimit from 'express-rate-limit';

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
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
      res.status(options.statusCode).json(options.message);
    },
    // Añadir validación de IP
    keyGenerator: (req) => {
      return req.ip;
    },
    // Añadir almacenamiento en memoria
    store: new rateLimit.MemoryStore(),
  });
};

export default rateLimiter;