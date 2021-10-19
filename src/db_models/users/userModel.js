'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true},
  username:{type:String, required:true},
  address:{type:Array},
  image:{type:String}
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;