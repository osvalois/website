import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import xss from 'xss-clean';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app, isProduction) => {
  // Configurar Helmet para seguridad adicional
  app.use((req, res, next) => {
    res.locals.nonce = uuidv4();
    next();
  });

  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'", "https://website-9r8.pages.dev"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, "https://cdn.jsdelivr.net", "https://unpkg.com"],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, "https://fonts.googleapis.com", "'unsafe-inline'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", 'data:', 'https://avatars.githubusercontent.com'],
        connectSrc: ["'self'", 'https://api.github.com', 'https://raw.githubusercontent.com', 'https://website-9r8.pages.dev'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
        upgradeInsecureRequests: []
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
    frameguard: { action: 'deny' },
  }));
  
  // Configurar CORS
  const corsOptions = {
    origin: function(origin, callback) {
      const allowedOrigins = isProduction 
        ? ['https://osvalois.tech', 'https://website-9r8.pages.dev']
        : ['http://localhost:3000', 'http://127.0.0.1:3000'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 300
  };

  if (!isProduction) {
    app.use(cors());
  } else {
    app.use(cors(corsOptions));
  }
  app.options('*', cors(corsOptions)); // habilita preflight request para todas las rutas

  // Parsear JSON y datos de formulario con límites estrictos
  app.use(express.json({ limit: '5kb' }));
  app.use(express.urlencoded({ extended: true, limit: '5kb' }));

  // Parsear cookies de forma segura
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Sanitizar entradas para evitar ataques XSS
  app.use(xss());

  // Evitar ataques de inyección de parámetros HTTP
  app.use(hpp());

  // Compresión de respuestas
  app.use(compression());

  // Configurar limitador de tasa (Rate Limiting) más estricto
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    keyGenerator: (req) => req.ip,
  });
  app.use('/', limiter);

  // Registro de solicitudes con Morgan en modo seguro
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));

  // Servir archivos estáticos con cache-control y nonce para CSP
  app.use(express.static(path.join(__dirname, '..', 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('X-Content-Type-Options', 'nosniff');
    }
  }));

  // Prevenir cache para rutas sensibles
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/login' || req.path === '/logout') {
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
    }
    next();
  });

  // Agregar encabezados de seguridad adicionales
  app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    next();
  });

  // Manejo de errores global
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An unexpected error occurred');
  });
};