'use strict';

const companySchema = (sequelize, DataTypes) => sequelize.define('Company', {
  id: { type: DataTypes.STRING, required: true },
  name: { type: DataTypes.STRING, required: true },
  leader: { type: DataTypes.STRING, default: null, required: false },
  size: { type: DataTypes.STRING, default: null, required: false },
  hqLocation: { type: DataTypes.STRING, default: null, required: false },
  product: { type: DataTypes.STRING, default: null, required: false },
  clients: { type: DataTypes.STRING, default: null, required: false },
  mission: { type: DataTypes.STRING, default: null, required: false },
  careersPage: { type: DataTypes.STRING, default: null, required: false },
});

module.exports = companySchema;


