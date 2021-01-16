'use strict';


var mongoose = require('mongoose'),
Topics = mongoose.model('Topics');

const errorHandler = require('../utilities/errorHandler.js');

exports.all = async (req, res) => {
    var query = {isActive : true};
    var topics = await Topics.find(query);
    if(topics.length > 0)
    res.json({status:"0", message: "success", data:{topics}});
    else
    res.send({status:"1", message: "No Records Found!", data:null});
};

//get category for id
exports.getTopicById = async (req,res) => {
  try{
    if(req.params.id === null || req.params.id === '')
    res.send({status:"1", message: "Invalid Request!", data:null});
    else {
      var query = {_id : req.params.id.toString()};
      var topic = await Topics.findOne(query);
      if(topic.length > 0)
        res.json({status:"0", message: "success", data:{topic}});
      else
      res.send({status:"1", message: "No Records Found!", data:null});
    }
  }
  catch(e) {
    errorHandler.sendErrorResponse(e,res);
  } 
};

exports.createTopic = async (req, res) => {
  try{
    if(req.body.theme ==="" || req.body.level ==="" || req.body.category ==="" || req.body.title ==="" || req.body.by ==="") 
    res.send({status:"1", message: "Invalid Request!", data:null});
    else {
      var topics = await checkTopicExists(req);
      if(topics.length > 0)
        res.json({status:"1", message: "Topic already exists!", data: null});
      else{
        var newTopic = new Topics(req.body);
        await newTopic.save();
        res.json({status:"0", message: "success", data:{newTopic}});
      }
    }
  }
  catch(e) {
    errorHandler.sendErrorResponse(e,res);
  }
  };

  exports.updateTopic = async (req,res) => {
    try {
      let id = req.body._id;
      if(id == null || id == "")
      res.send({status:"1", message: "Invalid Request!", data:null});
      else{
        var query = {_id : id};
        var topic = await Topics.findById(query);
        if (topic.model.length > 0) {
          var newQuery = {$set:{ theme: req.body.theme, level: req.body.level, category: req.body.category,
            title:req.body.title,by:req.body.by,keyword:req.body.keyword,intropara:req.body.intropara,
            discpara:req.body.discpara,videourl:req.body.videourl,imageurl:req.body.imageurl,mustread:req.body.mustread,
            references:req.body.references, question:req.body.question,isApproved:req.body.isApproved,
            isActive:req.body.isActive,updatedBy:req.body.updatedBy,updatedDate:req.body.updatedDate}};
          await Topics.updateOne(newQuery);
         res.json({status:"0", message: "success", data: null});
        }
        else
        res.send({status:"1", message: "No Records Found!", data:null});    
      }
    }
    catch(e) {
      errorHandler.sendErrorResponse(e,res);
    }
  };

  exports.editTopic= async (req,res) => {
    try{
      if(req.body.theme ==="" || req.body.level ==="" || req.body.category ==="" || req.body.title ==="" || req.body.by ==="")
       res.send({status:"1", message: "Invalid Request!", data:null});
      else {
          var topics = await checkTopicExists(req);
          if(topics.length > 0)
            res.json({status:"0", message: "success", data: {topics}});
            else
          res.send({status:"1", message: "No Records Found!", data:null});
        }
    }
    catch(e) {
      errorHandler.sendErrorResponse(e,res);
    }
  };

  const checkTopicExists = async (req) => {
    var topics = await Topics.aggregate([{
      $match :{
        $and : [
          {theme: req.body.theme},
          {level: req.body.level},
          {category: req.body.category},
          {title: req.body.title},
          {by: req.body.by},
          {isActive: true}
        ]
      }
    }]);
    return topics;
  }

  exports.searchTopic = async (req,res) => {
    try{
      if(req.body.theme ==="" || req.body.level ==="" || req.body.category ==="")
      res.send({status:"1", message: "Invalid Request!", data:null});
      else{
        var topics = await findTopicsByThemeLevelCategory(req);
        if(topics.length > 0)
          res.json({status:"0", message: "success", data: {topics}});
        else
          res.send({status:"1", message: "No Records Found!", data:null});
      }
    }
    catch(e){
      errorHandler.sendErrorResponse(e,res);
    }
  }

  const findTopicsByThemeLevelCategory = async (req) => {
    var topics = await Topics.aggregate([{
      $match :{
        $and : [
          {theme: req.body.theme},
          {level: req.body.level},
          {category: req.body.category},
          {isActive: true}
        ]
      }
    }]);
    return topics;
  }