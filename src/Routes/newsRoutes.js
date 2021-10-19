'use strict';

const express = require('express');
const newsletter = require('../db_models/newsletter/news-collection');
const router = express.Router();
const {checkJwt} = require('../auth/checkjwt');
const permissions = require('../auth/acl.js');

router.get('/newsletter', handleGetAll)
router.get('/newsletter/:id', handleGetOne);
router.post('/newsletter',checkJwt, permissions('create:newsletter'), handleCreate);
router.put('/newsletter/:id',checkJwt, permissions('update:newsletter'), handleUpdate);
router.delete('/newsletter/:id',checkJwt, permissions('delete:newsletter'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await newsletter.get();
  res.status(200).json(allRecords);
}
async function handleGetOne(req, res) {
  console.log(req.params)
  
  const id = req.params.id;
  let theRecord = await newsletter.get(id);
  res.status(200).json(theRecord);
}
async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await newsletter.create(obj);
  res.status(201).json(newRecord);
}
async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await newsletter.update(id, obj);
  res.status(200).json(updatedRecord);
}
async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await newsletter.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;