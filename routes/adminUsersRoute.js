'use strict';
module.exports = function(app) {
  var adminUser = require('../controllers/adminUsersController');

  // Routes
   app.route('/admin/users/create')
   .post(adminUser.createLogin);

   app.route('/admin/users/update')
   .post(adminUser.updateLogin);
};