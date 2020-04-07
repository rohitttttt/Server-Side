'use strict';


var mongoose = require('mongoose'),
Categories = mongoose.model('Categories');

exports.all = function(req, res) {
    var query = {isActive : true};

    Categories.find(query, function(err, categories) {
    if (err)
      res.send({status:"1", message: err, data:null});
      //console.log("Roles Response: "+ roles);
    res.json({status:"0", message: "success", data:{categories}});
  });
};

//get category for id
exports.getCategoryById = function(req,res){
    //console.log("Id is : "+ req.params.id);
    const id = req.params.id.toString();
    //console.log("id is : "+ id);
    var query = {_id : id};
    Categories.find(query,function(err,categories){
   if(err)
    res.send({status:"1", message: err, data:null});
   // console.log("No. of videos found : "+ videos.length);
    //console.log("Videos by Role response: "+ videos)
    res.json({status:"0", message: "success", data:{categories}});
  });
};

exports.createCategory = function(req, res) {
    var newCategory = new Categories(req.body);
    newCategory.save(function(err, category) {
      if (err)
      res.send({status:"1", message: err, data:null});
      res.json({status:"0", message: "success", data:{category}});
    });
  };

  exports.updateCategory = function(req,res){
    let id = req.body._id;
    if(id == null || id == "")
    res.send({status:"1", message: "Not Exists!", data:null});
    var query = {_id : id};
    var newQuery = {$set:{ theme: req.body.theme, level: req.body.level, category: req.body.category, 
        isApproved:req.body.isApproved,isActive:req.body.isActive,updatedBy:req.body.updatedBy,updatedDate:req.body.updatedDate}};
        Categories.updateOne(query,newQuery,function(err, updateResponse){
     if(err)
     res.send({status:"1", message: err, data:null});
     res.json({status:"0", message: "success", data: null});
    });
  };