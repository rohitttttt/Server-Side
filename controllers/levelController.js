'use strict';


var mongoose = require('mongoose'),
  Levels = mongoose.model('Levels');

exports.all = function(req, res) {
  Levels.find({}, function(err, levels) {
    if (err)
      res.send({status:"1", message: err, data:null});
     // console.log("Menus Response: "+ menus);
    res.json({status:"0", message: "success", data:{levels}});
  });
};
