// models/formModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const { encrypt } = require('../utils/encryption');

require('dotenv').config();

const schemaName = process.env.SCHEMA_NAME || 'personal_web_site';

const FormSubmission = sequelize.define('FormSubmission', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    get() {
      const encryptedEmail = this.getDataValue('encryptedEmail');
      return encrypt.decrypt(encryptedEmail, this.iv);
    },
    set(value) {
      const { encryptedData, iv } = encrypt.encrypt(value);
      this.setDataValue('encryptedEmail', encryptedData);
      this.iv = iv;
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const encryptedPhone = this.getDataValue('encryptedPhone');
      return encrypt.decrypt(encryptedPhone, this.iv);
    },
    set(value) {
      const { encryptedData, iv } = encrypt.encrypt(value);
      this.setDataValue('encryptedPhone', encryptedData);
      this.iv = iv;
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const encryptedMessage = this.getDataValue('encryptedMessage');
      return encrypt.decrypt(encryptedMessage, this.iv); 
    },
    set(value) {
      const { encryptedData, iv } = encrypt.encrypt(value);
      this.setDataValue('encryptedMessage', encryptedData);
      this.iv = iv;
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'form_submissions',
  schema: schemaName,
});

module.exports = FormSubmission;
