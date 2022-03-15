'use strict';

const jobSchema = (sequelize, DataTypes) => sequelize.define('Jobs', {
  company: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, defaltValue: null, allowNull: true },
  appliedDate: { type: DataTypes.DATE, defaltValue: null, allowNull: true },
  applied: { type: DataTypes.BOOLEAN, defaltValue: false, allowNull: false },
  targeted: { type: DataTypes.BOOLEAN, defaltValue: false, allowNull: false },
  // technologies: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  openPositions: { type: DataTypes.INTEGER, defaultValue: null, allowNull: true },
  interview: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  contacts: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  notes: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
});

module.exports = jobSchema;
