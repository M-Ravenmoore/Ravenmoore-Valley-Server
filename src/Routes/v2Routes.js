'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../db_models/data-collection');
const {checkJwt} = require('../auth/checkjwt');
const permissions = require('../auth/acl.js');
const router = express.Router();

const models = new Map();

// this looks at the param coming in from the request and searches for a match in the db-models folder and then applys the appropriate model.js file to the rest of the requests.

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../db_models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    }
    else {
      next('Invalid Model');
    }
  }
});

router.get('/:model',checkJwt, permissions('read'), handleGetAll);
router.get('/:model/:id',checkJwt, permissions('read'), handleGetOne);
router.post('/:model',checkJwt, permissions('create'),handleCreate);
router.put('/:model/:id',checkJwt, permissions('update'), handleUpdate);
router.delete('/:model/:id',checkJwt, permissions('delete'), handleDelete);

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
