'use strict';

const acl = {
  ta: ['read'],
  user: ['read', 'create', 'update', 'delete'], // for themselves
  admin: ['read', 'create', 'update', 'delete'], //for all
};

module.exports = (capability, role) => {

  return (req, res, next) => {

    try {
      if (req.user.role === role && req.user.capability.includes(capability)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login ACL');
    }

  };

};
