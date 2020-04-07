'use strict';
module.exports = function(app) {
  var video = require('../controllers/videoController');

  // Routes
  app.route('/videos')
    .get(video.all);   
 
  app.route('/videos/home')
  .get(video.homePageVideos);

  app.route('/videos/:id')
   .get(video.getVideosByRole);

   app.route('/video/create')
   .post(video.createVideo);

  app.route('/video/update')
  .post(video.updateVideo);
};