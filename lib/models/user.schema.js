'use strict';

const userSchema = (sequelize, DataTypes) => sequelize.define('Users', {
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
  // approvedViewer: { type: DataTypes.ARRAY(DataTypes.STRING), required: false },
});

module.exports = userSchema;
