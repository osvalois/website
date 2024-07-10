//index.js
const express = require('express');
const path = require('path');
const config = require('./src/config');
const middlewares = require('./src/middlewares');
const routes = require('./src/routes');
const errorHandlers = require('./src/utils/errorHandlers');
const logger = require('./src/utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para establecer el tipo MIME correcto para archivos JavaScript
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Aplicar configuraciones
config(app);

// Aplicar middlewares
middlewares(app);

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Servir archivos de posts
app.use('/posts', express.static(path.join(__dirname, 'posts')));

// Servir archivos de la carpeta src
app.use('/src', express.static(path.join(__dirname, 'src'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// API routes
app.use('/api', routes);

// Todas las demás solicitudes GET no manejadas deben devolver nuestra app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejar errores
errorHandlers(app);

const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

// Manejo de cierre gracioso del servidor
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    logger.info('Process terminated.');
  });
});

// Manejo de excepciones no capturadas
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Manejo de promesas rechazadas no capturadas
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;