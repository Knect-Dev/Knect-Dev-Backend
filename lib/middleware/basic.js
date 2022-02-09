'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Users } = require('../models'); 

async function authenticateBasic(email, password){
  console.log('users before', Users);
 
  console.log('In Auth Basic', email, password);


  const user = await Users.getBy('email', email);
  console.log('USER: ', user[0]);
  const validUser = await bcrypt.compare(password,  user[0].password); // compares entered PW with stored PW
  if (validUser) return user;
  throw new Error('invalid user'); // if credentials don't check out
}

module.exports = async (req, res, next) => {

  console.log('basic hit');

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [email, pass] = base64.decode(basic).split(':');


  try {
    req.user = await authenticateBasic(email, pass);
    next();
  } catch (e) {
    _authError();
    console.log(e);
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};
