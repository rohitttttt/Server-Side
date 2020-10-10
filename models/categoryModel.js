'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
    theme: {
    type: String,
    required: 'Kindly enter theme'
  },
  level: {
    type: String,
    required:'Kindly enter level'
  },
  category: {
    type: String,
    required:'Kindly enter category'
  },
  categoryImage: {
    type:Buffer
  },
  categoryImageBase64:{
    type: String,
    required: false,
  },
  description: {
    type: String
  },
  isApproved:{
    type: Boolean,
    required:'Kindly enter isApproved',
    default:false,
  },
  isActive:{
    type: Boolean,
    default:false,
  },
  created_by:{
    type:String,
    required : 'Kindly enter created by',
  },
  updated_by:{
    type: String,
  },
  updated_date:{
    type:Date,
  }
});

module.exports = mongoose.model('Categories', CategorySchema);