var dbUser = require('../models/user.model');

var userService = {};

userService.create = function(userDetails, err, next) {

	var userToCreate = new dbUser({
		email: userDetails.email,
		forename: userDetails.forename,
		surname: userDetails.surname,
		created: new Date()
	});

	userToCreate.save(function(saveErr, createdUser) {

		if (saveErr) {
			err(saveErr);
			return;
		}

		next(createdUser._id);
	});
};

userService.read = function(userId, err, next) {

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

userService.update = function(user, err, next) {

	userService.read(user.id, err, function(existingUser) {

		existingUser.email = user.email;
		existingUser.forename = user.forename;
		existingUser.surname = user.surname;

		existingUser.save(function(updateErr){
			if (updateErr){
				err(updateErr);
				return;
			}

			next();
		});
	});
};

userService.delete = function(userId, err, next) {

	dbUser.remove({'_id': userId}, function(deleteErr) {

		if (deleteErr){
			err(deleteErr);
			return;
		}

		next();
	});

};

module.exports = userService;