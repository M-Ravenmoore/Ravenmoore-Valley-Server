'use strict';

const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
  newsTitle:{type:String, required:true},
  newsDate:{type:Date, default:Date.now, required:true},
  newsContent:{type:String, required:true},
  postedBy:{type:String, required:true},
});

const newsletterModel = mongoose.model('newsletter', newsletterSchema);

module.exports = newsletterModel;