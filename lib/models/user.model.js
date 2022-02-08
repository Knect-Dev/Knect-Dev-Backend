'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = () => {
  const model = PLACEHOLDER.define('Users', {
    username: { 
      type: DataTypes.STRING, 
      required: true, 
      unique: true ,
    },
    password: { 
      type: DataTypes.STRING, 
      required: true ,
    },
    role: { 
      type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, 
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username });
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj);
        return token;
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });
};


module.exports = userModel;

