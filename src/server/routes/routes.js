// src/server/routes/routes.js
import express from 'express';
import { contactController } from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', contactController.submitContactForm);

export default router;