'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const {Users} = require('../models'); // import user schema TODO: build out user.model.js
const basicAuth = require('../middleware/basic.js'); // TODO: build out basic.js

// Define a SECRET
const SECRET = process.env.SECRET;


router.post('/signup', async (req, res, next) => {
  try { 
    // Before create, hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    // Before create make token -->
    req.body.token = jwt.sign({ email: req.body.email, expiresIn: 28800000}, SECRET, { expiresIn: 28800000 });
    let userRecord = await Users.create(req.body);
    if (!userRecord.token) next(userRecord);
    userRecord.dataValues.password = '';
    const output = {
      user: userRecord,
      token: userRecord.token,
    };

    console.log('USERRECORD:', userRecord)
    res.status(201).json(output);
  } catch (err) {
    next(err.message);
  }
});


// signin requires basic.js middleware
router.post('/signin', basicAuth, async (req, res, next) => {
  let token = jwt.sign({ email: req.user[0].dataValues.email, expiresIn: 28800000, signTime: Date.now()}, SECRET, { expiresIn: 28800000 });
  await Users.update(req.user[0].dataValues.id, { token });
  let userRecord = await Users.get( req.user[0].dataValues.id );
  console.log('userRecord', userRecord)
  userRecord.dataValues.password = '';
  const user = {
    user: userRecord.dataValues,
    token: userRecord.token,
  };
  
  res.status(200).json(user);
});


module.exports = router;