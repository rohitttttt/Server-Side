var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())


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
mongoose.connect('mongodb://localhost/Tododb'); // Rohit Need to Change After some time
//mongoose.connect('mongodb://localhost/s2s_db');  //Gaurav

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  //next();
});



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
