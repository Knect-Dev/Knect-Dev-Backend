'use strict';

const jobSchema = (sequelize, DataTypes) => sequelize.define('Jobs', {
  // id: { type: DataTypes.STRING, required: true },
  company: { type: DataTypes.STRING, required: true },
  title: { type: DataTypes.STRING, required: true },
  location: { type: DataTypes.STRING, defaltValue: '', required: false },
  appliedDate: { type: DataTypes.DATE, defaltValue: null, required: false },
  applied: { type: DataTypes.BOOLEAN, defaltValue: false, required: false },
  // technologies: { type: DataTypes.ARRAY(DataTypes.STRING), required: false },
  openPositions: { type: DataTypes.INTEGER, defaultValue: null, required: false },
  interview: { type: DataTypes.BOOLEAN, defaultValue: false, required: false },
  contacts: { type: DataTypes.STRING, defaultValue: '', required: false },
  notes: { type: DataTypes.STRING, defaultValue: '', required: false },
  owner: { type: DataTypes.STRING, required: true },
});

module.exports = jobSchema;
