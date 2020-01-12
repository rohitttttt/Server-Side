'use strict';


var mongoose = require('mongoose'),
  Roles = mongoose.model('Roles');

exports.all = function(req, res) {
    var query = {isActive : true};

  Roles.find(query, function(err, roles) {
    if (err)
      res.send(err);
      console.log("Roles Response: "+ roles);
    res.json(roles);
  });
};