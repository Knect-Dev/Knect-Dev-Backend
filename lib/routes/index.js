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
  if (dataModels[modelName]) {
    req.model = dataModels[modelName];
    next();
  } else {
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

function validateRecord(record, res, status) {
  if (record) {
    return res.status(status).json(record);
  } else {
    return res.status(404).send();
  }
};

// outline route handlers
async function handleGetOne(req, res, next) {
  const id = req.params.id;
  const model = req.params.model;
  console.log("ID:", id);
  let record = await req.model.get(id);
  console.log("RECORD", record);
  if (!record) {
    next();
    return;
  }

  const role = req.user[0].role;
  switch (model) {
    case "Users":
      if (req.user[0].email === record.dataValues.email || role === "admin") {
        // res.status(200).json(record);
        validateRecord(record, res, 200);

        return;
      }
      break;
    case "Jobs":
      // || record[0].allowedViewers.include(req.user[0].email) <---------------------------------------------- Add and test once DB is seeded
      if (req.user[0].id === record.dataValues.UserId || role === "admin") {
        // res.status(200).json(record);

        validateRecord(record, res, 200);

        return;
      }
      break;
    case "Companies":
      // res.status(200).json(record);
      validateRecord(record, res, 200);

      return;
    case "Contacts":
      // res.status(200).json(record);
      validateRecord(record, res, 200);

      return;
  }
  next("Requirements Not Met For GET Request");
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
        // console.log("records", records);
        // res.status(200).json(records);
        validateRecord(records, res, 200);

        return;
      }

    case "Companies":
      let records = await req.model.get();
      // res.status(200).json(records);
      validateRecord(records, res, 200);

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
        // res.status(200).json(records);
        validateRecord(records, res, 200);



        return;
      } else {
        //role is admin
        let records = await req.model.get();
        // console.log("records", records);
        validateRecord(records, res, 200);

        // res.status(200).json(records);
        return;
      }

    case "Contacts": {
      let records = await req.model.get();
      res.status(200).json(records);
      return;
    }
  }
  next("Requirements Not Met For GET Request");
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
      // res.status(201).json(newRecord);
      validateRecord(newRecord, res, 201);

      return;

    case "Jobs":
      if (role === "user") {
        obj.UserId = req.user[0].id; //-- Sets UserId within Job to be current User's id --//
        // console.log(obj);
        let newRecord = await req.model.create(obj);
        // res.status(201).json(newRecord);
        validateRecord(newRecord, res, 201);

      } else {
        //role is admin
        next("Not Allowed");
      }
      return;

    case "Contacts":
      if (role === "user") {
        obj.UserId = req.user[0].id; //-- Sets UserId within Contact to be current User's id --//
        let newRecord = await req.model.create(obj);
        // res.status(201).json(newRecord);
        validateRecord(newRecord, res, 201);

      } else {
        //role is admin
        next("Not Allowed");
      }
      return;
  }
  next("Requirements Not Met For POST Request");
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
        // res.status(202).json(updatedRecord);
        validateRecord(updatedRecord, res, 202);

      } else {
        let updatedRecord = await req.model.update(id, obj);
        // res.status(202).json(updatedRecord);
        validateRecord(updatedRecord, res, 202);

      }
      return;

    case "Companies":
      let updatedRecord = await req.model.update(id, obj);
      validateRecord(updatedRecord, res, 202);

      // if (updatedRecord) {
      //   res.status(202).json(updatedRecord);
      // } else {
      //   res.status(404).send();
      // }
      return;

    case "Jobs":
      let jobRecord = await req.model.get(id);
      if (!jobRecord) res.status(404).send();
      if (req.user[0].id === jobRecord.dataValues.UserId || role === "admin") {
        let updatedRecord = await req.model.update(id, obj);
        // if (updatedRecord) {
        //   res.status(202).json(updatedRecord);
        // } else {
        //   res.status(404).send();
        // }
        validateRecord(updatedRecord, res, 202);

        return;
      }
      res.status(404).send();
      return;
    case "Contacts":
      let contactRecord = await req.model.get(id);
      if (!contactRecord) res.status(404).send();
      if (req.user[0].id === contactRecord.dataValues.UserId || role === "admin") {
        let updatedRecord = await req.model.update(id, obj);
        // if (updatedRecord) {
        //   res.status(202).json(updatedRecord);
        // } else {
        //   res.status(404).send();
        // }
        validateRecord(updatedRecord, res, 202);

        return;
      }
      res.status(404).send();
      return;
  }
  next("Requirements Not Met For PUT Request");
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
        // res.status(200).json(deletedRecord);
        validateRecord(deletedRecord, res, 200);
        return;
      }
      break;

    case "Jobs":
      if (req.user[0].id === record.dataValues.UserId || role === "admin") {
        let deletedRecord = await req.model.delete(id);
        // res.status(200).json(deletedRecord);
        validateRecord(deletedRecord, res, 200);
        return;
      }
      break;

    case "Companies":
      if (role === "admin") {
        let deletedRecord = await req.model.delete(id);
        // res.status(200).json(deletedRecord);
        validateRecord(deletedRecord, res, 200);
        return;
      }
      break;
    case "Contacts":
      if (req.user[0].id === record.dataValues.UserId || role === "admin") {
        let deletedRecord = await req.model.delete(id);
        // res.status(200).json(deletedRecord);
        validateRecord(deletedRecord, res, 200);
        return;
      }
      break;
  }
  next("Requirements Not Met For DELETE Request");
}

module.exports = router;
