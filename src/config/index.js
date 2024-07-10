const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", 'https://cdn.jsdelivr.net'],
        'img-src': ["'self'", 'https://avatars.githubusercontent.com', 'data:'],
        'connect-src': ["'self'", 'https://api.github.com', 'https://raw.githubusercontent.com'],
      },
    },
    dnsPrefetchControl: { allow: true },
    frameguard: { action: 'sameorigin' },
    hidePoweredBy: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { policy: 'none' },
    referrerPolicy: { policy: 'same-origin' },
  }));
};