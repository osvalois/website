const express = require('express');
const path = require('path');
const formRoutes = require('../api/routes/formRoutes');

const router = express.Router();

router.use('/form', formRoutes);

module.exports = router;