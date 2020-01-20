'use strict';


var mongoose = require('mongoose'),
  Videos = mongoose.model('Videos');

  //get all videos
exports.all = function(req, res) {
  Videos.find({}, function(err, videos) {
    if (err)
      res.send({status:"1", message: err, data:null});
      //console.log("Videos by roles response: "+ videos);
    res.json({status:"0", message: "success", data:{videos}});
  });
};

//get all home page videos
exports.homePageVideos = function(req, res) {
  var query = {forHomePage: true};
  Videos.find(query, function(err, videos) {
    if (err)
      res.send({status:"1", message: err, data:null});
      //console.log("Videos response: "+ videos);
    res.json({status:"0", message: "success", data:{videos}});
  });
};

//get all videos filtered on role
exports.getVideosByRole = function(req,res){
    const roleId = Number(req.params.id);
    //console.log("roleId is : "+ roleId);
    var query = {roles : roleId.toString()};
  Videos.find(query,function(err,videos){
   if(err)
    res.send({status:"1", message: err, data:null});
   // console.log("No. of videos found : "+ videos.length);
    //console.log("Videos by Role response: "+ videos)
    res.json({status:"0", message: "success", data:{videos}});
  });
};

exports.createVideo = function(req, res) {
    var newVideo = new Videos(req.body);
    newVideo.save(function(err, video) {
      if (err)
        res.send(err);
      res.json(video);
    });
  };

