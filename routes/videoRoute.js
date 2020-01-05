'use strict';
module.exports = function(app) {
  var video = require('../controllers/videoController');

  // Routes
  app.route('/videos')
    .get(video.all)
    //.get(menus.sample)
    .post(video.createVideo);

  app.route('/videos/:id')
   .get(video.getVideosByRole);
};