'use strict';

// require('dotenv').config();
//-- Bring in Sequelize and DataTypes in order to use in numerous different Collections --//
const { Sequelize, DataTypes } = require('sequelize');

//-- Uses either environment variable for Database URl, or sqlite3 file locally --//
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

//-- Collection used to give models their CRUD methods --//
const Collection = require('./data-collections.js');

//-- Files referring to various data Schemas --//
const userSchema = require('./user.schema');
const jobSchema = require('./job.schema');
const companySchema = require('./company.schema');
const contactSchema = require('./contact.schema');

//-- Creates connection to database --//


// const db = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: true,
//     rejectUnauthorized: false,
//   },
// });

const DATABASE_CONFIG = {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
};

const db = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

//-- Converts Schemas to Models --//
const userModel = userSchema(db, DataTypes);
const jobModel = jobSchema(db, DataTypes);
const companyModel = companySchema(db, DataTypes);
const contactModel = contactSchema(db, DataTypes);

//-- Builds out all table associations --//
userModel.hasMany(jobModel, { onDelete: 'CASCADE' }); //-- Used to delete all Jobs relating to a User --// 
jobModel.belongsTo(userModel);

userModel.hasMany(contactModel, { onDelete: 'CASCADE' }); //-- Used to delete all Contacts relating to a User --//
contactModel.belongsTo(userModel);

// possible junction table to map Companies to Users
// userModel.hasMany(companyModel);
// companyModel.belongsTo(userModel, { through: jobModel });

userModel.hasMany(contactModel, { onDelete: 'CASCADE' });
contactModel.belongsTo(userModel);
companyModel.hasMany(contactModel);
contactModel.belongsTo(companyModel);
jobModel.hasMany(contactModel);
contactModel.belongsTo(jobModel);

companyModel.hasMany(jobModel);
jobModel.belongsTo(companyModel);

module.exports = {
  db,
  Users: new Collection(userModel),
  Jobs: new Collection(jobModel),
  Companies: new Collection(companyModel),
  Contacts: new Collection(contactModel),
};

