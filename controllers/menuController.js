'use strict';


var mongoose = require('mongoose'),
  Menus = mongoose.model('Menus');

exports.all = function(req, res) {
  Menus.find({}, function(err, menus) {
    if (err)
      res.send(err);
      console.log("Menus Response: "+ menus);
    res.json(menus);
  });
};

// exports.sample = function(req,res){
//     res.send("test");
// };

exports.createMenu = function(req, res) {
    var newMenu = new Menus(req.body);
    newMenu.save(function(err, menu) {
      if (err)
        res.send(err);
      res.json(menu);
    });
  };
