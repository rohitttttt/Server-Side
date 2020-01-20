'use strict';

module.exports = function(app) {
    var user = require('../controllers/userController');
  
    // Routes
    app.route('/user/login')
      .post(user.authenticate);
      //.post(menu.createMenu);
    app.route('/user/register')
     .post(user.create);
  };