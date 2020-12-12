'use strict';

const adminUsersModel = require('../models/adminUsersModel');


var mongoose = require('mongoose'),
AdminUsers = mongoose.model('AdminUsers');

  exports.createLogin = async function (req,res) {
    try{
        if(req.body.email ==="" || req.body.password ==="" || req.body.firstName==="" ||req.body.username==="" )
          res.send({ status: "1", message: "Validation Failed!.", data: null });
        var query ={$or : [{email: req.body.email}, {username: req.body.username}]};
        const adminUserExists = await AdminUsers.find(query);
        if(adminUserExists.length > 0)
          res.send({ status: "1", message: "Already Exists!.", data: null });
        else {
          var adminUser = new AdminUsers(req.body);
          await adminUser.save();
          res.json({status:"0", message: "success", data:{adminUser}});
        }       
    }
    catch(e){
      sendErrorResponse(e,res);
    }
  };

  exports.updateLogin = async function(req,res) {
    try {
      if((req.body._id ==="") || (req.body.updated_by==="") ||  req.body.email ==="" || req.body.password ==="" || req.body.firstName==="" ||req.body.username==="" )
        res.send({ status: "1", message: "Validation Failed!.", data: null });
      var query = {_id:req.body._id};
      console.log(query);
      console.log(req.body.isactive);
      var newQuery = {
        $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roleId: req.body.roleId,
        mobile: req.body.mobile,
        password: req.body.password,
        //isActive: req.body.isActive == undefined ? false : req.body.isActive, 
        updated_by: req.body.updated_by
        }
      };
      AdminUsers.updateOne(query,newQuery,function(err, updateResponse){
        console.log(1);
        if(err){
          console.log(2);
          res.send({status: "1", message: err, data: null });
        }
          console.log(3);
          res.send({status:"0", message: "success", data:null});
      });
    } catch (e) {
      sendErrorResponse(e,res);
    }
  }

  const sendErrorResponse = function(req,res){
    console.error(req);
    res.send({ status: "1", message: "Please try again later!", data: null });
  }
  