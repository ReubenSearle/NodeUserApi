var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var config = require('./config');
var apiController = require('./controllers/user.controller');

var port = process.env.PORT || 3000;
var app = express();
app.listen(port);

// use body parser to enable
// industry standard data exchange format (json)
app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect(config.mongooseConnection);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// initialise user api controller
	apiController(app);
});