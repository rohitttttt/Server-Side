'use strict';
module.exports = function(app) {
  var topic = require('../controllers/TopicController');

  // Routes
  app.route('/topics')
    .get(topic.all);   

  app.route('/topics/:id')
   .get(topic.getTopicById);

   app.route('/topics/create')
   .post(topic.createTopic);

  app.route('/topics/update')
  .post(topic.updateTopic);
};