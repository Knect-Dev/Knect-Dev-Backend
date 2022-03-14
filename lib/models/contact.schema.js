'use strict';

const contactSchema = (sequelize, DataTypes) => sequelize.define('Contact', {
  firstName: { type: DataTypes.STRING, required: true },
  lastName: { type: DataTypes.STRING, required: true },
  company: { type: DataTypes.STRING, required: true },
  email: { type: DataTypes.STRING, required: false },
  linkedIn: { type: DataTypes.STRING, required: false },
  phone: { type: DataTypes.STRING, required: false },
  photo: { type: DataTypes.STRING, required: false },
  notes: { type: DataTypes.STRING, required: false },
});

module.exports = contactSchema;