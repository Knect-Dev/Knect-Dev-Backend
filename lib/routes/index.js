'use strict';

const express = require('express');
const dataModels = require('../models'); // TODO: build out data models
const bearerAuth = require('../middleware/bearer.js'); // TODO: build out bearer.js
const acl = require('../middleware/acl.js'); // TODO: build out acl.js

const router = express.Router();

// check if requested route is valid
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  // check for data model
  if (dataModels[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

// outline routes
router.get('/:model/id', bearerAuth, handleGetOne);
router.get('/:model', bearerAuth, handleGetAll);
router.post('/:model', bearerAuth, acl('create'), handleCreate);
router.put('/:model/:id', bearerAuth, acl('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, acl('delete'), handleDelete); // admin access


// outline route handlers

async function handleGetOne(req, res) {
  const id = req.params.id;
  let record = await req.model.get(id);
  res.status(200).json(record);
}

async function handleGetAll(req, res) {
  let records = await req.model.get();
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