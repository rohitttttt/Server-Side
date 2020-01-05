'use strict';
module.exports = function(app) {
  var menu = require('../controllers/menuController');

  // Routes
  app.route('/menus')
    .get(menu.all)
    //.get(menus.sample)
    .post(menu.createMenu);
};