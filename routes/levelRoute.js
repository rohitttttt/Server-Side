'use strict';
module.exports = function(app) {
  var level = require('../controllers/levelController');

  // Routes
  app.route('/levels')
    .get(level.all);
};