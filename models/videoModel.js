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
  }
});

module.exports = mongoose.model('Videos', VideoSchema);