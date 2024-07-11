import logger from './logger.js';

const isDevelopment = process.env.NODE_ENV === 'development';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log del error
  if (isDevelopment) {
    logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  } else {
    logger.error(`${err.name}: ${err.message}`);
  }

  // Respuesta al cliente
  res.status(statusCode).json({
    status: 'error',
    message: isDevelopment ? err.message : 'An unexpected error occurred',
    ...(isDevelopment && { stack: err.stack })
  });
};

const notFoundHandler = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

export default (app) => {
  // Manejo de rutas no encontradas
  app.use(notFoundHandler);

  // Manejo de errores global
  app.use(errorHandler);
};