var express = require('express')
var cors = require('cors')
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

var app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),

  //created model loading here
  loadMenu = require('./models/menuModel'), 
  loadVideo = require('./models/videoModel'),
  loadRoles = require('./models/roleModel'),
  loadUsers = require('./models/userModel'),
  loadCategories=require('./models/categoryModel'),
  loadTopics=require('./models/topicModel'),
  loadLevels=require('./models/levelModel'),
  loadAdminUsers=require('./models/adminUsersModel'),

  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb'); // Rohit Need to Change After some time
mongoose.connect('mongodb://localhost/s2s_db',{
  useNewUrlParser: true,
  useUnifiedTopology:true
});  //Gaurav


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
  //next();
});



app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.set('saltRounds',12);            // no of rounds for hashing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//swagger
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 //importing route
var videoRoute = require('./routes/videoRoute');
var menuRoute = require('./routes/menuRoute');
var roleRoute = require('./routes/rolesRoute');
var userRoute =  require('./routes/userRoute');
var categoryRoute=require('./routes/categoryRoute');
var topicRoute=require('./routes/topicRoute');
var levelRoute=require('./routes/levelRoute');
var adminUserRoute=require('./routes/adminUsersRoute');

//register the route
videoRoute(app); 
menuRoute(app);
roleRoute(app);
userRoute(app);
categoryRoute(app);
topicRoute(app);
levelRoute(app);
adminUserRoute(app);

var apiRoute = port; //+ "/api/v1/";
app.listen(apiRoute);
console.log('Study 2 Shine RESTful API server started on: ' + apiRoute);
