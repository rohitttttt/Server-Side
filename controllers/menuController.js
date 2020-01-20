'use strict';


var mongoose = require('mongoose'),
  Menus = mongoose.model('Menus');

exports.all = function(req, res) {
  Menus.find({}, function(err, menus) {
    if (err)
      res.send({status:"1", message: err, data:null});
     // console.log("Menus Response: "+ menus);
    res.json({status:"0", message: "success", data:{menus}});
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
