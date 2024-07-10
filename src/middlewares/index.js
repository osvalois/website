const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

module.exports = (app) => {
  // Parsear JSON y datos de formulario
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Sanitizar entradas para evitar ataques XSS
  app.use(xss());

  // Evitar ataques de inyección de parámetros HTTP
  app.use(hpp());

  // Configurar CORS
  app.use(cors());

  // Compresión de respuestas
  app.use(compression());

  // Configurar limitador de tasa (Rate Limiting)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });
  app.use('/api', limiter);

  // Registro de solicitudes con Morgan
  app.use(morgan('combined'));

  // Servir archivos estáticos
  app.use(express.static(path.join(__dirname, '..', 'public')));
};