"use strict";

const express = require("express");
const dataModels = require("../models");
const bearerAuth = require("../middleware/bearer.js");
const nanoid = require("nanoid").nanoid;
const router = express.Router();

// Routes Reference
("use strict");
require("dotenv").config();

// check if requested route is valid
router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  // check for data model
  console.log("ROUTER PARAMETER MODEL NAME", modelName);
  if (dataModels[modelName]) {
    req.model = dataModels[modelName];
    next();
  } else {
    console.log("BADROUTE GOT ME HERE");
    next("Invalid Model");
  }
});

// Routes
router.get("/", bearerAuth, (req, res) => res.status(200).send(req.user));
router.get("/:model/:id", bearerAuth, handleGetOne);
router.get("/:model", bearerAuth, handleGetAll);
router.post("/:model", bearerAuth, handleCreate);
router.put("/:model/:id", bearerAuth, handleUpdate);
router.delete("/:model/:id", bearerAuth, handleDelete);

// outline route handlers
async function handleGetOne(req, res, next) {
  const id = req.params.id;
  const model = req.params.model;
  console.log("ID:", id);
  let record = await req.model.get(id);

  if (record.length === 0) {
    next();
    return;
  }

  const role = req.user[0].role;
  switch (model) {
    case "Users":
      if (req.user[0].email === record[0].email || role === "admin") {
        res.status(200).json(record);
        return;
      }
      break;
    case "Jobs":
      // || record[0].allowedViewers.include(req.user[0].email) <---------------------------------------------- Add and test once DB is seeded
      if (req.user[0].id === record[0].UserId || role === "admin") {
        res.status(200).json(record);
        return;
      }
      break;
    case "Companies":
      res.status(200).json(record);
      return;
    case "Contacts":
      res.status(200).json(record);
      return;
  }
  next("requirements not met for GET request");
}

async function handleGetAll(req, res, next) {
  // console.log('req', req);
  const model = req.params.model;
  const role = req.user[0].role;

  switch (model) {
    case "Users":
      if (role === "user") {
        next("Access Denied");
        return;
      } else {
        //role is admin
        let records = await req.model.get();
        console.log("records", records);
        res.status(200).json(records);
        return;
      }

    case "Companies":
      let records = await req.model.get();
      res.status(200).json(records);
      return;

    case "Jobs":
      if (role === "user") {
        // Change to ID
        let requestedUserId = req.query.id;
        // let requestedUser = await Users.get(requestedUserId);
        // if (req.query.id) {
        //   if (
        //     requestedUserId === req.user[0].id ||
        //     requestedUser.allowedViewers.includes(req.user[0].email)
        //   ) {
        //     let records = await req.model.getBy("UserId", req.user[0].id);
        //     // let records = await req.model.getBy("UserId", requestedUser.id);

        //     if (records.length === 0) {
        //       next();
        //       return;
        //     }

        //     // console.log("records", records);
        //     res.status(200).json(records);
        //   }
        // } else {
          // let records = await req.model.getBy("owner", req.user[0].email);
        let records = await req.model.getBy("UserId", req.user[0].id);

          if (records.length === 0) {
            next('No Records');
            return;
          }

          // console.log("records", records);
          res.status(200).json(records);


        return;
      } else {
        //role is admin
        let records = await req.model.get();
        console.log("records", records);
        res.status(200).json(records);
        return;
      }

    case "Contacts": {
      let records = await req.model.get();
      res.status(200).json(records);
      return;
    }
  }
  next("requirements not met for GET request");
}

async function handleCreate(req, res, next) {
  const model = req.params.model;
  const role = req.user[0].role;
  const obj = req.body;
  // obj.id = nanoid();
  switch (model) {
    case "Users":
      //no one can create a user, must use /signup route
      next();
      return;

    case "Companies":
      let newRecord = await req.model.create(obj);
      res.status(201).json(newRecord);
      return;

    case "Jobs":
      if (role === "user") {
        obj.UserId = req.user[0].id; //-- Sets UserId within Job to be current User's id --//
        // console.log(obj);
        let newRecord = await req.model.create(obj);
        res.status(201).json(newRecord);
      } else {
        //role is admin
        next("Not Allowed");
      }
      return;

    case "Contacts":
      if (role === "user") {
        obj.UserId = req.user[0].id; //-- Sets UserId within Contact to be current User's id --//
        let newRecord = await req.model.create(obj);
        res.status(201).json(newRecord);
      } else {
        //role is admin
        next("Not Allowed");
      }
      return;
  }
  next("requirements not met for POST request");
}

async function handleUpdate(req, res, next) {
  const model = req.params.model;
  const role = req.user[0].role;
  let id = req.params.id;
  const obj = req.body;
  switch (model) {
    case "Users":
      if (role === "user") {
        id = req.user[0].id;
        let updatedRecord = await req.model.update(id, obj);
        res.status(202).json(updatedRecord);
      } else {
        let updatedRecord = await req.model.update(id, obj);
        res.status(202).json(updatedRecord);
      }
      return;

    case "Companies":
      let updatedRecord = await req.model.update(id, obj);
      res.status(202).json(updatedRecord);
      return;

    case "Jobs":
      let jobRecord = await req.model.get(id);
      if (!jobRecord) res.status(404).send();
      if (req.user[0].id === jobRecord.dataValues.UserId || role === "admin") {
        let updatedRecord = await req.model.update(id, obj);
        console.log('BEFORE IF STATEMENT', updatedRecord)
        if (updatedRecord) {
          res.status(202).json(updatedRecord);
        } else {
          console.log("FALSE UPDATE - Catch", updatedRecord)
          res.status(404).send();
        }
        return;
      }
      res.status(404).send();
      return;
    case "Contacts":
      let contactRecord = await req.model.get(id);
      if (!contactRecord) res.status(404).send();
      if (req.user[0].id === contactRecord.dataValues.UserId || role === "admin") {
        let updatedRecord = await req.model.update(id, obj);
        if (updatedRecord) {
          res.status(202).json(updatedRecord);
        } else {
          console.log("FALSE UPDATE - Catch", updatedRecord)
          res.status(404).send();
        }
        return;
      }
      res.status(404).send();
      return;
  }
  next("requirements not met for PUT request");
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
    case "Users":
      if (req.user[0].email === record.dataValues.email || role === "admin") {
        let deletedRecord = await req.model.delete(id);
        res.status(200).json(deletedRecord);
        return;
      }
      break;

    case "Jobs":
      if (req.user[0].id === record.dataValues.UserId || role === "admin") {
        let deletedRecord = await req.model.delete(id);
        res.status(200).json(deletedRecord);
        return;
      }
      break;

    case "Companies":
      if (role === "admin") {
        let deletedRecord = await req.model.delete(id);
        res.status(200).json(deletedRecord);
        return;
      }
      break;
    case "Contacts":
      if (req.user[0].id === record.dataValues.UserId || role === "admin") {
        let deletedRecord = await req.model.delete(id);
        res.status(200).json(deletedRecord);
        return;
      }
      break;
  }
  next("requirements not met for DELETE request");
}

module.exports = router;
