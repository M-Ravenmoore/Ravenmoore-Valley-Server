'use strict';

const express = require('express');
const users = require('../db_models/users/user-collection');
const router = express.Router();

const {checkJwt} = require('../auth/checkjwt');
const permissions = require('../auth/acl.js');

router.get('/users',checkJwt, permissions('read:users'), handleGetAll)
router.get('/users/:id',checkJwt, permissions('read:profile'), handleGetOne);
router.post('/users',checkJwt, permissions('create:users'), handleCreate);
router.put('/users/:id',checkJwt, permissions('update:users'), handleUpdate);
router.delete('/users/:id',checkJwt, permissions('delete:users'), handleDelete);


async function handleGetAll(req, res) {
  let allRecords = await users.get();
  res.status(200).json(allRecords);
}
async function handleGetOne(req, res) {
  console.log(req.params)
  
  const id = req.params.id;
  let theRecord = await users.get(id);
  res.status(200).json(theRecord);
}
async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await users.create(obj);
  res.status(201).json(newRecord);
}
async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await users.update(id, obj);
  res.status(200).json(updatedRecord);
}
async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await users.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;