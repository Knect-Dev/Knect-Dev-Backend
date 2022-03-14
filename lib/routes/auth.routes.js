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
    let results = await Users.getBy("email", req.body.email);
    if(results.length > 0 || !req.body.email ) throw new Error("This email is already registered.");
    // Before create, hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    // Before create make token -->
    console.log('Email:', req.body.email);
    req.body.token = jwt.sign({ email: req.body.email }, SECRET);
    let userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch(e){
    next(e.message);
  }
});

// signin requires basic.js middleware
router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});


module.exports = router;
