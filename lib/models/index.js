'use strict';

// require('dotenv').config();
//-- Bring in Sequelize and DataTypes in order to use in numerous different Collections --//
const { Sequelize, DataTypes } = require('sequelize');

//-- Uses either environment variable for Database URl, or sqlite3 file locally --//
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

//-- Collection used to give models their CRUD methods --//
const Collection = require('./data-collections.js');

//-- Files referring to various data Schemas --//
const userSchema = require('./user.schema');
const jobSchema = require('./job.schema');
const companySchema = require('./company.schema');
const contactSchema = require('./contact.schema');

const db = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

//-- Converts Schemas to Models --//
const userModel = userSchema(db, DataTypes);
const jobModel = jobSchema(db, DataTypes);
const companyModel = companySchema(db, DataTypes);
const contactModel = contactSchema(db, DataTypes);


module.exports = {
  db,
  Users: new Collection(userModel),
  Jobs: new Collection(jobModel),
  Companies: new Collection(companyModel),
  Contacts: new Collection(contactModel),
};

