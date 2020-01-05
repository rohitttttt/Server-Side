'use strict';


var mongoose = require('mongoose'),
  Videos = mongoose.model('Videos');

  //get all videos
exports.all = function(req, res) {
  Videos.find({}, function(err, videos) {
    if (err)
      res.send(err);
      console.log("Videos Response: "+ videos);
    res.json(videos);
  });
};

//get all home page videos
exports.homePageVideos = function(req, res) {
  var query = {forHomePage: true};
  Videos.find(query, function(err, videos) {
    if (err)
      res.send(err);
      console.log("Videos Response: "+ videos);
    res.json(videos);
  });
};

//get all videos filtered on role
exports.getVideosByRole = function(req,res){
    const roleId = Number(req.params.id);
  videos.find({},function(err,videos){
   if(err)
    res.send(err);
    console.log("Videos by Role response: "+ videos)
  });
};

// exports.sample = function(req,res){
//     res.send("test");
// };

exports.createVideo = function(req, res) {
    var newVideo = new Videos(req.body);
    newVideo.save(function(err, video) {
      if (err)
        res.send(err);
      res.json(video);
    });
  };

