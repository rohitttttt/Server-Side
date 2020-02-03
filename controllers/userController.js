'use strict';


const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
Users = mongoose.model('Users');

module.exports = {
 create: function(req, res, next) {
    if(req.body.email ==="" || req.body.password === "")
             res.json({status:"1",message:"Mandatory fields required!!!"});
    try{
      //check if user already exists
      Users.findOne({email:req.body.email}, function(err,userInfo){
          if(err)
              next(err);
          else{
              if(userInfo != null || userInfo != undefined)
              {                
                if(userInfo.email === req.body.email)
                res.json({status:"1",message:"User exists!!!"});
              }
          }
      });
      console.log("password: "+ req.body.password);    
      Users.create({ email: req.body.email, password: req.body.password, mobile : req.body.mobile, 
                         firstName : req.body.firstName, lastName : req.body.lastName, gender : req.body.gender,
                         signupRole: req.body.signupRole, existingUser: req.body.existingUser,
                         parentUsername: req.body.parentUsername, parentPassword: req.body.parentPassword,
                         level: req.body.level }, function (err, result) {
       if (err)        
        next(err);
       else       
       res.json({status: "0", message: "success", data: null});     
    });
  }
  catch(error){
    console.error(error);
    res.json({status:"1", message: "please try again later!"});  
  }
 },
authenticate: function(req, res, next) {
  if(req.body.email ==="" || req.body.password ==="")
      res.json({status:"1",message:"Invalid email/password!!!"});
    try {
          Users.findOne({email:req.body.email}, function(err, userInfo){
           if (err) {
            next(err);
           } 
           else {                              
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
        catch (error) {
          console.error(error);
          res.json({status:"1", message: "please try again later!"});  
        }
     }
   }