'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MenuSchema = new Schema({
    menuItemText: {
    type: String,
    required: 'Kindly enter the name of the menu'
  },
  menuPath: {
    type: String,
    required:'Kindly enter the path of the menu'
  }
});

module.exports = mongoose.model('Menus', MenuSchema);