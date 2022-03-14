'use strict';

const companySchema = (sequelize, DataTypes) => sequelize.define('Company', {
  // id: { type: DataTypes.STRING, required: true },
  name: { type: DataTypes.STRING, required: true },
  leader: { type: DataTypes.STRING, defaultValue: null, required: false },
  size: { type: DataTypes.STRING, defaultValue: null, required: false },
  hqLocation: { type: DataTypes.STRING, defaultValue: null, required: false },
  product: { type: DataTypes.STRING, defaultValue: null, required: false },
  clients: { type: DataTypes.STRING, defaultValue: null, required: false },
  mission: { type: DataTypes.STRING, defaultValue: null, required: false },
  careersPage: { type: DataTypes.STRING, defaultValue: null, required: false },
});

module.exports = companySchema;


