'use strict';

const mongoose = require('mongoose');

const itemListingSchema = mongoose.Schema({
  itemName:{type:String, required:true},
  itemDescription:{type:String, required:true},
  itemPrice:{type:Number, required:true},
  itemQuantity:{type:Number, required:true},
  itemColors:{type:[String]},
  itemTags:{type:[String]}, 
  shopName:{type:[String]},
  createdBy:{type:String, required:true},
});

const itemListingModel = mongoose.model('itemListing', itemListingSchema);

module.exports = itemListingModel;