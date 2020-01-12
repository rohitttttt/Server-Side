'use strict';

module.exports = function(app) {
    var user = require('../controllers/userController');
  
    // Routes
    app.route('/user/login')
      .post(user.authenticate)
      //.post(menu.createMenu);
  };