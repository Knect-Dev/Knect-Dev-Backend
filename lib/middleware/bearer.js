'use strict';

const { Users } = require('../models');
const jwt = require('jsonwebtoken');

// Define a SECRET
const SECRET = process.env.SECRET;


async function authenticateToken(token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    const user = await Users.getBy('email', parsedToken.email);
    if (user[0].count !== 0) return user;
    throw new Error('User not found');
  } catch (e) {
    throw new Error(e.message);
  }

}

module.exports = async (req, res, next) => {


  try {
    if (!req.headers.authorization) { return _authError(); }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    _authError();
    console.log(e);
    function _authError() {
      res.status(403).send('Invalid Login Bearer');
    }
  }
};
