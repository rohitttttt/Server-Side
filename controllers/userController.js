'use strict';


const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
Users = mongoose.model('Users');

module.exports = {
 create: function(req, res, next) {
    if(req.body.email ==="" || req.body.password === "")
             res.json({status:"1",message:"Mandatory fields required!!!"});
      //check if user already exists
      Users.findOne({email:req.body.email}, function(err,userInfo){
          if(err){
              next(err);
          }
          else{
              if(userInfo != null || userInfo != undefined)
              {
                console.log('user info :' + userInfo);
                if(userInfo.email === req.body.email)
                res.json({status:"1",message:"User exists!!!"});
              }
          }
      });
      //let hashPass = bcrypt.hashSync(req.body.password, req.app.get('saltRounds')); //hash password
      // console.log('hashed pass :' + hashPass);
      // let salt = bcrypt.genSaltSync(req.app.get('saltRounds'));
      // hashPass = bcrypt.hashSync(req.body.password,salt);
      //console.log("password: "+ req.body.password);
      let hashPass = req.body.password;
      //console.log("hashPass : "+ hashPass);
      //console.log('hash password with salt : '+ hashPass);
      //let hashPassParent =  bcrypt.hashSync(req.body.parentPassword,req.app.get('saltRounds')); // hash password
      let hashPassParent = req.body.parentPassword;

      Users.create({ email: req.body.email, password: hashPass, mobile : req.body.mobile, 
                         firstName : req.body.firstName, lastName : req.body.lastName, gender : req.body.gender,
                         signupRole: req.body.signupRole, existingUser: req.body.existingUser,
                         parentUsername: req.body.parentUsername, parentPassword: hashPassParent,
                         level: req.body.level }, function (err, result) {
       if (err)        
        next(err);
       else       
       res.json({status: "0", message: "success", data: null});     
    });
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
            //  console.log("user info : "+ userInfo);
            //  console.log("user info pass : "+ userInfo.password);
            //  console.log("req pass : "+ req.body.password);
            //  console.log("compare == :"+ req.body.password == userInfo.password);
            //  console.log("compare === :"+ req.body.password === userInfo.password);
            //let hashPass = bcrypt.hashSync(req.body.password, req.app.get('saltRounds')); //hash password 
            if(req.body.password == userInfo.password)
            {
              const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
              res.json({status:"0", message: "success", data:{user: userInfo, token:token}});
            }                    
            // if(bcrypt.compareSync(req.body.password, userInfo.password)) {                       
            //   const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
            //   res.json({status:"0", message: "success", data:{user: userInfo, token:token}});
            //  }
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