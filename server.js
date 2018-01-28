// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3535;        // set our port

// Please remember to encode any special characters of the password on the connection string
var mongoose = require('mongoose');
mongoose.connect('mongodb://YOUR CONNECTION STRING'); // connect to our database

var main_router = express.Router();    
main_router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3535/api)
main_router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', main_router);
app.use('/api', require('./app/routes/user'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);