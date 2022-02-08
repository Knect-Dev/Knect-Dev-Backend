'use strict';

const express = require('express');
const router = express.Router();

const {user} = require('../models'); // import user schema TODO: build out user.model.js
const basicAuth = require('../middleware/basic.js'); // TODO: build out basic.js


router.get('/', (req, res, next) => {
  res.status(200).send('main page hit!');
});

router.post('/signup', async (req, res, next) => {

  try {
    let userRecord = await user.create(req.body);
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