'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 email: {
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
 gender:{
    type: Number,
    trim: true,
    required: true
 },
 signupRole:{
    type: Number,
    trim: true,
    required: true
 },
 existingUser:{
    type: Boolean,
    trim: true,
    required: false
 },
 parentUsername:{
    type: String,
    trim: true,
    required: false
 },
 parentPassword:{
    type: String,
    trim: true,
    required: false
 },
 level:{
    type: Number,
    trim: true,
    required: true
 }
});

//hash user password before saving into database
UserSchema.pre('save', function(next){
if(!this.isModified("password"))
   return next();
this.password = bcrypt.hashSync(this.password, saltRounds);
if(this.password != undefined || !this.parentPassword == null)
    this.parentPassword = bcrypt.hashSync(this.parentPassword,saltRounds);
next();
});
module.exports = mongoose.model('Users', UserSchema);