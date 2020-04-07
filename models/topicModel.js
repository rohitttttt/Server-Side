'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TopicSchema = new Schema({
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
   title: {
    type: String,
    required:'Kindly enter title'
  },
  by:{
    type:String,
  },
  keyword:{
    type:String,
  },
  intropara:{
    type:String,
  },
  discpara:{
    type:String,
  },
  concpara:{
    type:String,
  },
  videourl:{
    type:String,
  },
  mustread:{
    type:String,
  },
  references:{
    type:String,
  },
  question:{
    type:Array,
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

module.exports = mongoose.model('Topics', TopicSchema);