const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar limitador de tasa (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limita a 100 solicitudes por IP por ventana de 15 minutos
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Seguridad con Helmet y configuración de CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", 'https://cdn.jsdelivr.net'],
        'img-src': ["'self'", 'https://avatars.githubusercontent.com', 'data:'],
        'connect-src': ["'self'", 'https://api.github.com', 'https://raw.githubusercontent.com'],
      },
    },
    // Otras configuraciones de Helmet para mejorar la seguridad
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { policy: 'none' },
    referrerPolicy: { policy: 'no-referrer' },
  })
);

// Evitar ataques de inyección de parámetros HTTP
app.use(hpp());

// Sanitizar entradas para evitar ataques XSS
app.use(xss());

// Registro de solicitudes con Morgan
app.use(morgan('combined'));

// Aplicar limitador de tasa a todas las solicitudes
app.use(limiter);

// Servir el archivo HTML estático
app.use(express.static(path.join(__dirname)));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
