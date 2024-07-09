// controllers/formController.js
const formModel = require('../models/formModel');
const sendEmail = require('../utils/email');

exports.submitForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await formModel.saveForm(name, email, phone, message);
    await sendEmail({ name, email, phone, message });
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};
