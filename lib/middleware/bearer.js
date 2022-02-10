'use strict';

const { Users } = require('../models');
const jwt = require('jsonwebtoken');

// Define a SECRET
const SECRET = 'DogsRuleCatsDrool';

//bruiser token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDQ0NDMwNDN9.bWoVfPhsb0Zi3PsQdO8VeGm4CZIyDXEXrxhdbYTeh3o

async function authenticateToken(token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    console.log(parsedToken);
    const user = await Users.getBy('email', parsedToken.email);
    if (user) return user;
    throw new Error('User not found');
  } catch (e) {
    throw new Error(e.message);
  }
  
}

//goliath token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDQ0NDk1MTN9.Xo0Rko_-eiTKD-E5jWj3kIvR61hpH07fYn_SB7vh1Ho

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
  }

  function _authError() {
    res.status(403).send('Invalid Login Bearer');
  }

};
