'use strict';

const userSchema = (sequelize, DataTypes) => sequelize.define('Users', {
  firstName: { type: DataTypes.STRING, required: true },
  lastName: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING, required: true },
  token: { type: DataTypes.STRING, required: true },
  email: { type: DataTypes.STRING, required: true },
  role: { type: DataTypes.STRING, required: false, defaultValue: 'user' },
  // approvedViewer: { type: DataTypes.ARRAY(DataTypes.STRING), required: false },
});

module.exports = userSchema;
