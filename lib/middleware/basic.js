'use strict';

const base64 = require('base-64');
const { users } = require('../models');

async function authenticateBasic(username, password){

  console.log('In Auth Basic', username, password);
  const user = await this.findOne({where: { username }});
  const validUser = await bcrypt.compare(password, user.password); // compares entered PW with stored PW
  if (validUser) return user;
  throw new Error('invalid user'); // if credentials don't check out
};

module.exports = async (req, res, next) => {

  console.log('basic hit');

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (e) {
    _authError();
    console.log(e);
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};
