'use strict';


const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
Users = mongoose.model('Users');

module.exports = {
//  create: function(req, res, next) {
  
//   userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
//       if (err)        
//        next(err);
//       else
//        res.json({status: "success", message: "User added successfully!!!", data: null});
      
//     });
//  },
authenticate: function(req, res, next) {
 console.log("username : "+ req.body.email + " and passord is : "+ req.body.password);
  Users.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      next(err);
     } 
     else {
         console.log("userInfo is :" + userInfo);
         console.log("secretKey is : "+ req.app.get('secretKey'));

         let hashPass = bcrypt.hashSync(req.body.password, 10); //hash password
        console.log("Hashed Password is :" + hashPass);

        if(bcrypt.compareSync(req.body.password, userInfo.password)) {
            console.log("database password is : " + userInfo.password);           
            const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
            console.log("token is : "+ token);
            res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
            }
            else {
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
          }
    });
 },
}