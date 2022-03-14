'use strict';

const jobSchema = (sequelize, DataTypes) => sequelize.define('Job', {
  // id: { type: DataTypes.STRING, required: true },
  company: { type: DataTypes.STRING, required: true },
  title: { type: DataTypes.STRING, required: true },
  location: { type: DataTypes.STRING, default: '', required: false },
  appliedDate: { type: DataTypes.DATE, default: null, required: false },
  applied: { type: DataTypes.BOOLEAN, default: false, required: false },
  // technologies: { type: DataTypes.ARRAY(DataTypes.STRING), required: false },
  openPositions: { type: DataTypes.INTEGER, default: null, required: false },
  interview: { type: DataTypes.BOOLEAN, default: false, required: false },
  contacts: { type: DataTypes.STRING, default: '', required: false },
  notes: { type: DataTypes.STRING, default: '', required: false },
  owner: { type: DataTypes.STRING, required: true },
});

module.exports = jobSchema;
