'use strict';
module.exports = function(app) {
  var category = require('../controllers/categoryController');

  // Routes
  app.route('/categories')
    .get(category.all);   

  app.route('/categories/:id')
   .get(category.getCategoryById);

   app.route('/categories/create')
   .post(category.createCategory);

  app.route('/categories/update')
  .post(category.updateCategory);

  //app.route('/categories/image/:id').get(category.getImage);
};