// ROUTES FOR OUR API
// =============================================================================
var express = require('express');
var user_route = express.Router();              // get an instance of the express Router
var User = require('../models/user');


user_route.route('/users')
    // create a bear (accessed at POST http://localhost:3535/api/users)
    .post(function (req, res) {

        var user = new User();      // create a new instance of the Bear model
        user.name = req.body.name;  // set the bears name (comes from the request)

        console.log("this is the data:"+user);

        // save the bear and check for errors
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

user_route.route('/users/:user_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function (req, res) {

        // use our bear model to find the bear we want
        User.findById(req.params.user_id, function (err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the bears info

            // save the bear
            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// Return router
module.exports = user_route;