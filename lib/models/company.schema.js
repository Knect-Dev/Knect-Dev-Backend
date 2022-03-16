'use strict';

const companySchema = (sequelize, DataTypes) => sequelize.define('Companies', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  logo: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  leader: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  founded: { type: DataTypes.INTEGER, defaultValue: null, allowNull: true },
  hq: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  size: { type: DataTypes.INTEGER, defaultValue: null, allowNull: true },
  product: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  clients: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  mission: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  companyUrl: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  careersUrl: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
});

module.exports = companySchema;


