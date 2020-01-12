'use strict';
module.exports = function(app) {
  var role = require('../controllers/rolesController');

  // Routes
  app.route('/roles')
    .get(role.all)
    //.get(menus.sample)
    //.post(menu.createMenu);
};