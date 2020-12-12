'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
 email: {
  type: String,
  trim: true,
  required: true
 },
 username: {
     type: String,
     trim: true,
     required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 mobile:{
    type: String,
    trim: true,
    required: true
 },
 firstName:{
    type: String,
    trim: true,
    required: true
 },
 lastName:{
    type: String,
    trim: true,
    required: false
 },
 roleId:{
    type: Number,
    trim: true,
    required: true
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

//hash user password before saving into database
AdminUserSchema.pre('save', function(next){
if(!this.isModified("password"))
   return next();
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('AdminUsers', AdminUserSchema);