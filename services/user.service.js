var dbUser = require('../models/user.model');

var userService = {};

// create a user in the database
userService.create = function(userDetails, err, next) {

	// create the user model from the user details
	var userToCreate = new dbUser({
		email: userDetails.email,
		forename: userDetails.forename,
		surname: userDetails.surname,
		created: new Date()
	});

	// commit the user model to the database
	userToCreate.save(function(saveErr, createdUser) {

		if (saveErr) {
			err(saveErr);
			return;
		}

		next(createdUser._id);
	});
};

// read a user from the database
userService.read = function(userId, err, next) {

	// retrieve the user model from the database, using the id to uniquely identify
	dbUser.findOne({'_id': userId}, function(readErr, userRead) {

		if (readErr) {
			err(readErr);
			return;
		}

		if (!userRead){
			err('User not found for the specified user id');
			return;
		}

		next(userRead);
	});
};

// update an existing user in the database
userService.update = function(user, err, next) {

	// retrieve the user model from the database, using the id to uniquely identify
	userService.read(user.id, err, function(existingUser) {

		// update the user details
		existingUser.email = user.email;
		existingUser.forename = user.forename;
		existingUser.surname = user.surname;

		// save the user model with new details
		existingUser.save(function(updateErr){
			if (updateErr){
				err(updateErr);
				return;
			}

			next();
		});
	});
};

// delete an existing user from the database
userService.delete = function(userId, err, next) {

	// remove the user model from the database, using the id to uniquely identify
	dbUser.remove({'_id': userId}, function(deleteErr) {

		if (deleteErr){
			err(deleteErr);
			return;
		}

		next();
	});

};

module.exports = userService;