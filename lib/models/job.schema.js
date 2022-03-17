'use strict';

const jobSchema = (sequelize, DataTypes) => sequelize.define('Jobs', {
  company: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  jobId: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  jobUrl: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  appliedDate: { type: DataTypes.DATE, defaultValue: null, allowNull: true },
  stage: { type: DataTypes.STRING, defaultValue: 'Not Applied', allowNull: false },
  status: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
  openPositions: { type: DataTypes.INTEGER, defaultValue: null, allowNull: true },
  location: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  technologies: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  targeted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  offer: { type: DataTypes.INTEGER, defaultValue: null, allowNull: true },
  notes: { type: DataTypes.STRING(1250), defaultValue: null, allowNull: true },
});

module.exports = jobSchema;
