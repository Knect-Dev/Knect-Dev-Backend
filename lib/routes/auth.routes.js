'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const {Users} = require('../models'); // import user schema TODO: build out user.model.js
const basicAuth = require('../middleware/basic.js'); // TODO: build out basic.js

// Define a SECRET
const SECRET = 'DogsRuleCatsDrool';
//poncho token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvbmNob0RvZ2VAZG9nZS5jb20iLCJpYXQiOjE2NDQ0NTAwMTF9.3QWhcDQTGzOWTB82CwOgqyOMT4uoY6g-_PVNvhlBKsw

//mya token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15YURvZ2VAZG9nZS5jb20iLCJpYXQiOjE2NDQ0NTAyMjZ9.I7IUI1y3pIpqeFT1hfTeAeLTjuYZcmSI44w5Iga0z_M

router.post('/signup', async (req, res, next) => {

  console.log(req.body);

  
  try {
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

  // // Authenticate Basic
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);

});


module.exports = router;
