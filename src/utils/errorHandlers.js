const logger = require('./logger');

module.exports = (app) => {
  // Manejo de errores global
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({
      status: 'error',
      message: process.env.NODE_ENV === 'production' 
        ? 'Something went wrong!' 
        : err.message
    });
  });
};