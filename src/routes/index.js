const formRoutes = require('../api/routes/formRoutes');

module.exports = (app) => {
  app.use('/api/form', formRoutes);

  // Ruta de fallback para SPA
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });
};