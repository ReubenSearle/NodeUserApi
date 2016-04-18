var userValidator = require('../validators/user.validator');
var userService = require('../services/user.service');

var userController = function(app) {

	// create a new user
	app.post('/create', function(req, res) {

		// retrieve user details from the request
		var userDetails = {
			email: req.body.email,
			forename: req.body.forename,
			surname: req.body.surname
		};

		// validation errors should return an array of error details 
		var validationErr = function(errors) {
			res.status(400).send(errors);
		};

		// validate the request data
		userValidator.validateCreate(userDetails, validationErr, function() {

			// internal error should return details
			// successful create should return new user id
			var err = function(errMsg) {
				res.status(500).send(errMsg);
			};
			var next = function(userId) {
				res.send(userId);
			};

			// sanitise the user details
			userDetails.email = userDetails.email.trim();
			userDetails.forename = userDetails.forename.trim();
			userDetails.surname = userDetails.surname.trim();

			// persist the user
			userService.create(userDetails, err, next);			
		});
	});

	// retrieve a user - identify with user id
	app.get('/read', function(req, res) {

		// retrieve the user id from the query string
		var userId = req.query.userId;

		// validation errors should return an array of error details
		var validationErr = function(errors) {
			res.status(400).send(errors);
		};
		
		// validate the request data
		userValidator.validateRead(userId, validationErr, function() {

			// internal error should return details
			// successful read should return user
			var err = function(errMsg) {
				res.status(500).send(errMsg);
			};
			var next = function(user) {
				res.send(user);
			};

			// retrieve the user
			userService.read(userId, err, next);			
		});
	});

	// update a user - identify with user id
	app.put('/update', function(req, res) {

		// retrieve user details from the request
		var userDetails = {
			id: req.body.id,
			email: req.body.email,
			forename: req.body.forename,
			surname: req.body.surname
		};

		// validation errors should return an array of error details
		var validationErr = function(errors) {
			res.status(400).send(errors);
		};

		// validate the request data
		userValidator.validateUpdate(userDetails, validationErr, function() {

			// internal error should return details
			// successful update should return confirmation
			var err = function(errMsg) {
				res.status(500).send(errMsg);
			};
			var next = function() {
				res.send('User updated');
			};

			// sanitise the user details
			userDetails.email = userDetails.email.trim();
			userDetails.forename = userDetails.forename.trim();
			userDetails.surname = userDetails.surname.trim();

			// update the user with new details
			userService.update(userDetails, err, next);			
		});
	});

	// remove a user - identify with user id
	app.delete('/delete', function(req, res) {

		// retrieve the user id from the query string
		var userId = req.query.userId;

		// validation errors should return an array of error details
		var validationErr = function(errors) {
			res.status(400).send(errors);
		};

		// validate the request data
		userValidator.validateDelete(userId, validationErr, function() {

			// internal error should return details
			// successful delete should return confirmation
			var err = function(errMsg) {
				res.status(500).send(errMsg);
			};
			var next = function(user) {
				res.send('User deleted');
			};

			// delete the user
			userService.delete(userId, err, next);			
		});
	});

};

module.exports = userController;