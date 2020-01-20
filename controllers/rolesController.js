'use strict';


var mongoose = require('mongoose'),
  Roles = mongoose.model('Roles');

exports.all = function(req, res) {
    var query = {isActive : true};

  Roles.find(query, function(err, roles) {
    if (err)
      res.send({status:"1", message: err, data:null});
      //console.log("Roles Response: "+ roles);
    res.json({status:"0", message: "success", data:{roles}});
  });
};