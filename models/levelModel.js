'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LevelSchema = new Schema({
    primary: {
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

module.exports = mongoose.model('Levels', LevelSchema);