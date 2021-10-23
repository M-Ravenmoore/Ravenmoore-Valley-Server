'use strict';

const express = require('express');
const listings = require('../db_models/listings/item-collection');
const router = express.Router();
const {checkJwt} = require('../auth/checkjwt');
const permissions = require('../auth/acl.js');

router.get('/listings', handleGetAll)
router.get('/listings/:id', handleGetOne);
router.post('/listings',checkJwt, permissions('create:listing'), handleCreate);
router.put('/listings/:id',checkJwt, permissions('update:listing'), handleUpdate);
router.delete('/listings/:id',checkJwt, permissions('delete:listing'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await listings.get();
  res.status(200).json(allRecords);
}
async function handleGetOne(req, res) {
  console.log(req.params)
  const id = req.params.id;
  let theRecord = await listings.get(id);
  res.status(200).json(theRecord);
}
async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await listings.create(obj);
  res.status(201).json(newRecord);
}
async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await listings.update(id, obj);
  res.status(200).json(updatedRecord);
}
async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await listings.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;