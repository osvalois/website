import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './src/config/config.js';
import middlewares from './src/middlewares/middlewares.js';
import errorHandlers from './src/utils/errorHandlers.js';
import loggerPromise from './src/utils/logger.js';
import routes from './src/server/routes/routes.js';

// ... (código existente)
// En una función asíncrona
const logger = await loggerPromise;
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

logger.info('Initializing server...');

try {
  // Middleware para establecer el tipo MIME correcto para archivos JavaScript
  app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.type('application/javascript');
    }
    next();
  });

  logger.info('Applying configurations...');
  // Aplicar configuraciones
  config(app);

  logger.info('Applying middlewares...');
  // Aplicar middlewares
  middlewares(app);
  app.use('/api', routes);
  // Servir archivos estáticos
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/posts', express.static(path.join(__dirname, 'posts')));
  app.use('/src', express.static(path.join(__dirname, 'src'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));

  // Todas las demás solicitudes GET no manejadas deben devolver nuestra app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  logger.info('Applying error handlers...');
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