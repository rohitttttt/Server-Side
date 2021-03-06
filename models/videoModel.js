'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
    title: {
    type: String,
    required: 'Kindly enter title of the video'
  },
  description: {
    type: String,
    required:'Kindly enter descrption of the menu'
  },
  url:{
    type: String
  },
  roles:{
    type: Array
  },
  categories : {
    type: Array
  },
  forHomePage:{
    type: Boolean
  }
});

module.exports = mongoose.model('Videos', VideoSchema);