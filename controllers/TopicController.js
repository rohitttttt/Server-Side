'use strict';


var mongoose = require('mongoose'),
Topics = mongoose.model('Topics');

exports.all = function(req, res) {
    var query = {isActive : true};

    Topics.find(query, function(err, topics) {
    if (err)
      res.send({status:"1", message: err, data:null});
      //console.log("Roles Response: "+ roles);
    res.json({status:"0", message: "success", data:{topics}});
  });
};

//get category for id
exports.getTopicById = function(req,res){
    const id = req.params.id.toString();
    //console.log("roleId is : "+ roleId);
    var query = {_id : id};
    Topics.find(query,function(err,topics){
   if(err)
    res.send({status:"1", message: err, data:null});
   // console.log("No. of videos found : "+ videos.length);
    //console.log("Videos by Role response: "+ videos)
    res.json({status:"0", message: "success", data:{topics}});
  });
};

exports.createTopic = function(req, res) {
    var newTopic = new Topics(req.body);
    newTopic.save(function(err, topic) {
      if (err)
      res.send({status:"1", message: err, data:null});
      res.json({status:"0", message: "success", data:{topic}});
    });
  };

  exports.updateTopic = function(req,res){
    let id = req.body._id;
    if(id == null || id == "")
    res.send({status:"1", message: "Not Exists!", data:null});
    var query = {_id : id};
    var newQuery = {$set:{ theme: req.body.theme, level: req.body.level, category: req.body.category,
        title:req.body.title,by:req.body.by,keyword:req.body.keyword,intropara:req.body.intropara,
        discpara:req.body.discpara,videourl:req.body.videourl,imageurl:req.body.imageurl,mustread:req.body.mustread,
        references:req.body.references, question:req.body.question,isApproved:req.body.isApproved,
        isActive:req.body.isActive,updatedBy:req.body.updatedBy,updatedDate:req.body.updatedDate}};
        Topics.updateOne(query,newQuery,function(err, updateResponse){
     if(err)
     res.send({status:"1", message: err, data:null});
     res.json({status:"0", message: "success", data: null});
    });
  };