'use strict';


const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
Users = mongoose.model('Users');

module.exports = {
 create: function(req, res, next) {
    if(req.body.email ==="" || req.body.password === "")
             res.json({status:"1",message:"Mandatory fields required!!!"});
      let hashPass = bcrypt.hashSync(req.body.password, 10); //hash password
      Users.create({ email: req.body.email, password: hashPass, mobile : req.body.mobile, 
                         firstName : req.body.firstName, lastName : req.body.lastName, gender : req.body.gender,
                         signupRole: req.body.signupRole, existingUser: req.body.existingUser,
                         parentUsername: req.body.parentUsername, parentPassword: hashPass,
                         level: req.body.level }, function (err, result) {
       if (err)        
        next(err);
       else       
       res.json({status: "0", message: "User added successfully!!!", data: null});     
    });
 },
authenticate: function(req, res, next) {
  if(req.body.email ==="" || req.body.password ==="")
      res.json({status:"1",message:"Invalid email/password!!!"});
  Users.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     } 
     else {
         //let hashPass = bcrypt.hashSync(req.body.password, 10); //hash password
        if(bcrypt.compareSync(req.body.password, userInfo.password)) {         
            const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
            res.json({status:"0", message: "success", data:{user: userInfo, token:token}});
            }
            else {
                    res.json({status:"1", message: "Invalid email/password!!!", data:null});
                }
          }
    });
 }
}