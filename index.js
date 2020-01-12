var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),

  //created model loading here
  loadMenu = require('./models/menuModel'), 
  loadVideo = require('./models/videoModel'),
  loadRoles = require('./models/roleModel'),
  loadUsers = require('./models/userModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/s2s_db'); 

app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 //importing route
var videoRoute = require('./routes/videoRoute');
var menuRoute = require('./routes/menuRoute');
var roleRoute = require('./routes/rolesRoute');
var userRoute =  require('./routes/userRoute');

//register the route
videoRoute(app); 
menuRoute(app);
roleRoute(app);
userRoute(app);

app.listen(port);
console.log('Study 2 Shine RESTful API server started on: ' + port);
