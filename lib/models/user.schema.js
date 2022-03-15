'use strict';

const userSchema = (sequelize, DataTypes) => sequelize.define('Users', {
  firstName: { type: DataTypes.STRING, allowNull: false, unqiue: true },
  lastName: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
  // approvedViewer: { type: DataTypes.ARRAY(DataTypes.STRING), required: false },
});

module.exports = userSchema;
