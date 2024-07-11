// index.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './src/config/config.js';
import middlewares from './src/middlewares/middlewares.js';
import errorHandlers from './src/utils/errorHandlers.js';
import loggerPromise from './src/utils/logger.js';
import routes from './src/server/routes/routes.js';

const logger = await loggerPromise;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

logger.info('Initializing server...');

try {
  // Aplicar configuraciones
  config(app);

  // Aplicar middlewares
  middlewares(app);

  // Rutas API
  app.use('/api', routes);

  // Servir archivos estáticos con configuraciones de seguridad
  app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('X-Content-Type-Options', 'nosniff');
    }
  }));
  app.use('/src', express.static(path.join(__dirname, 'src'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
    maxAge: '1d'
  }));

  // Ruta para manejar solicitudes GET a la página principal
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // Manejar rutas no mapeadas
  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  // Manejar errores
  app.use((err, req, res, next) => {
    logger.error(`Error ${err.status || 500}: ${err.message}`);
    
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
        status: err.status || 500
      }
    });
  });

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

} catch (error) {
  logger.error('Error during server initialization:', error);
  process.exit(1);
}

// Manejo de excepciones no capturadas
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Manejo de promesas rechazadas no capturadas
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;