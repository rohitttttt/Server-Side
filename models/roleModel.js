'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RoleSchema = new Schema({
    roleName: {
    type: String,
    trim: true,
    required: 'Kindly enter name of the Role'
  }
});

module.exports = mongoose.model('Roles', RoleSchema);