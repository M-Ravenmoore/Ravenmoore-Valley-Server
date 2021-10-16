'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../db_models/data-collection');
const {checkJwt} = require('../auth/checkjwt');
const permissions = require('../auth/acl');

const router = express.Router();

const models = new Map();

// this looks at the param coming in from the request and searches for a match in the db-models folder and then applys the appropriate model.js file to the rest of the requests.

router.param('model', (request, response, next) => {
  const modelName = request.params.model;
  if (models.has(modelName)) {
    request.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../bd-models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      request.model = models.get(modelName);
      next();
    }
    else {
      next('Invalid DB-Model see docs');
    }
  }
});

// need to set permmision locks for 

// get all resources from db model
router.get('/:model',checkJwt, handleGetAll);
// get one from db
router.get('/:model/:id',checkJwt, handleGetOne);
// create new item in db
router.post('/:model',checkJwt, handleCreate);
// update an ite in the db for a model
router.put('/:model/:id',checkJwt, handleUpdate);
// delete an item in the chosen db model
router.delete('/:model/:id',checkJwt, handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
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