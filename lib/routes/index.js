'use strict';

const express = require('express');
const dataModels = require('../models'); // TODO: build out data models
const bearerAuth = require('../middleware/bearer.js'); // TODO: build out bearer.js
const acl = require('../middleware/acl.js'); // TODO: build out acl.js

const router = express.Router();

// Routes Reference
'use strict';
require('dotenv').config();


// Users.get().then((data) => console.log(data));
// Jobs.get().then((data) => console.log(data));
// Companies.get().then((data) => console.log(data));


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

// outline routes
router.get('/', (req, res) =>  res.status(200).send('test'));
// router.get('/:model/id', bearerAuth, handleGetOne);
router.get('/:model/:id', handleGetOne);
// router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model', handleGetAll);
// router.post('/:model', bearerAuth, acl('create'), handleCreate);
router.post('/:model', handleCreate);
// router.put('/:model/:id', bearerAuth, acl('update'), handleUpdate);
router.put('/:model/:id', handleUpdate);
// router.delete('/:model/:id', bearerAuth, acl('delete'), handleDelete); // admin access
router.delete('/:model/:id', handleDelete); // admin access


// outline route handlers
async function handleGetOne(req, res) {
  const id = req.params.id;
  console.log('ID:', id);
  let record = await req.model.get(id);
  res.status(200).json(record);
}

async function handleGetAll(req, res) {
  // console.log('req', req);
  let records = await req.model.get();
  console.log('records', records);
  res.status(200).json(records);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;