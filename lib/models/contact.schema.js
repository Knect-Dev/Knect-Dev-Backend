'use strict';

const contactSchema = (sequelize, DataTypes) => sequelize.define('Contacts', {
  name: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  email: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  linkedIn: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  phone: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  photo: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  notes: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
});

module.exports = contactSchema;