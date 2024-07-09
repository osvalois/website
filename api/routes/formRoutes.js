// routes/formRoutes.js
const express = require('express');
const formController = require('../controllers/formController');

const router = express.Router();

router.post('/submit', formController.submitForm);

module.exports = router;
