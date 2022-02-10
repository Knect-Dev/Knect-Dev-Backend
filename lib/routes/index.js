'use strict';

const express = require('express');
const dataModels = require('../models');
const bearerAuth = require('../middleware/bearer.js'); 
const nanoid = require('nanoid').nanoid;
const router = express.Router();

// Routes Reference
'use strict';
require('dotenv').config();


// check if requested route is valid
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  // check for data model
  if (dataModels[modelName]) {
    req.model = dataModels[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

// Routes
router.get('/', bearerAuth, (req, res) =>  res.status(200).send(req.user));
router.get('/:model/:id', bearerAuth, handleGetOne);
router.get('/:model', bearerAuth, handleGetAll);
router.post('/:model', bearerAuth, handleCreate);
router.put('/:model/:id', bearerAuth, handleUpdate);
router.delete('/:model/:id', bearerAuth, handleDelete); 

// outline route handlers
async function handleGetOne(req, res, next) {
  const id = req.params.id;
  const model = req.params.model;
  console.log('ID:', id);
  let record = await req.model.get(id); 

  if (record.length === 0) {
    next();
    return;
  }

  const role = req.user[0].role;
  switch (model) {
    case 'Users':
      if (req.user[0].email === record[0].email || role === 'admin') {
        res.status(200).json(record);
        return;
      }
      break;
    case 'Jobs':
      // || record[0].allowedViewers.include(req.user[0].email) <---------------------------------------------- Add and test once DB is seeded
      if (req.user[0].email === record[0].owner || role === 'admin') {
        res.status(200).json(record);
        return;
      }
      break;
    case 'Companies':
      res.status(200).json(record);
      return;
  }
  next('requirements not met for get request');
}

async function handleGetAll(req, res, next) {
  // console.log('req', req);
  const model = req.params.model;
  const role = req.user[0].role;
  

  switch (model) {
    case 'Users':
      if (role === 'user') {
        next('Access Denied');
        return;
      } else {
        //role is admin
        let records = await req.model.get();
        console.log('records', records);
        res.status(200).json(records);
        return;
      }

    case 'Companies':
      let records = await req.model.get();
      console.log('records', records);
      res.status(200).json(records);
      return;

    case 'Jobs':
      if (role === 'user') {
        // Change to ID
        if(req.query.id){
          let requestedUserId = req.query.id;
          let requestedUser = await User.get(requestedUserId); 

          if(requestedUserId === req.user[0].id || requestedUser.allowedViewers.includes(req.user[0].email)){
            let records = await req.model.getBy('owner', requestedUser.email);
          }
        } else {
          let records = await req.model.getBy('owner', req.user[0].email);
        }

        if (records.length === 0) {
          next();
          return;
        }

        console.log('records', records);
        res.status(200).json(records);
        return;
      } else {
        //role is admin
        let records = await req.model.get();
        console.log('records', records);
        res.status(200).json(records);
        return;
      }
    }
  next('requirements not met for get request');
}

async function handleCreate(req, res, next) {
  const model = req.params.model;
  const role = req.user[0].role;
  const obj = req.body;
  obj.id = nanoid();
  switch (model) {
    case 'Users':
      //no one can create a user, must use /signup route
      next('Not Allowed');
      return;

    case 'Companies':
      let newRecord = await req.model.create(obj);
      res.status(201).json(newRecord);
      return;

    case 'Jobs':
      if (role === 'user') {
        obj.owner = req.user[0].email; // Sets owner prop to user email
        console.log(obj)
        let newRecord = await req.model.create(obj);
        res.status(201).json(newRecord);
      } else {
        //role is admin
        next('Not Allowed');
      }
      return;
  }
  next('requirements not met for get request');
}

async function handleUpdate(req, res, next) {
  const model = req.params.model;
  const role = req.user[0].role;
  let id = req.params.id;
  const obj = req.body;

  switch (model) {
    case 'Users':
      if (role === 'user') {
        id = req.user[0].id;
        let updatedRecord = await req.model.update(id, obj);
        res.status(202).json(updatedRecord);
      } else {
        let updatedRecord = await req.model.update(id, obj);
        res.status(202).json(updatedRecord);
      }
      return;

    case 'Companies':
      let updatedRecord = await req.model.update(id, obj);
      res.status(202).json(updatedRecord);
      return;

    case 'Jobs':
      let jobRecord = await req.model.get(id);
      if (req.user[0].email === jobRecord[0].owner || role === 'admin') {
        let updatedRecord = await req.model.update(id, obj);
        res.status(202).json(updatedRecord);
        return;
      }
      break;
  }
  next('requirements not met for get request');

}

async function handleDelete(req, res, next) {
  let id = req.params.id;
  const model = req.params.model;
  let record = await req.model.get(id);

  if (record.length === 0) {
    next();
    return;
  }

  const role = req.user[0].role;
  switch (model) {
    case 'Users':
      if (req.user[0].email === record[0].email || role === 'admin') {
        let deletedRecord = await req.model.delete(id);
        res.status(200).json(deletedRecord);
        return;
      }
      break;

    case 'Jobs':
      if (req.user[0].email === record[0].owner || role === 'admin') {
        let deletedRecord = await req.model.delete(id);
        res.status(200).json(deletedRecord);
        return;
      }
      break;

    case 'Companies':
      if (role === 'admin') {
        let deletedRecord = await req.model.delete(id);
        res.status(200).json(deletedRecord);
        return;
      }
      break;
  }
  next('requirements not met for get request');
}

module.exports = router;
