var userValidator = {};

// validate provided email address using industry standard regex
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// validate create user request
userValidator.validateCreate = function(userDetails, err, next) {

	var validationErrors = [];

	// check for empty or invalid email address
	if (!userDetails.email || !validateEmail(userDetails.email)) {
		validationErrors.push({param: 'email', value: userDetails.email, 
								message: 'Invalid email address'});
	}

	// check for empty or invalid forename (max length 50chars)
	var forenameLength = userDetails.forename.length;
	if (!userDetails.forename || forenameLength < 1 || forenameLength > 50){
		validationErrors.push({param: 'forename', value: userDetails.forename, 
								message: 'A forename of between 1 and 50 chars is required'});
	}

	if (validationErrors.length > 0) {
		// validation errors have been detected
		err(validationErrors);
		return;
	}

	// validation passed
	next();	
};

// validate retrieve user request
userValidator.validateRead = function(userId, err, next) {

	var validationErrors = [];

	// check for empty or invalid user id (required 24 chars length)
	if (!userId || userId.length !== 24) {
		validationErrors.push({param: 'userId', value: userId, 
								message: 'A valid 24 character user id is required'});
	}

	if (validationErrors.length > 0) {
		// validation errors have been detected
		err(validationErrors);
		return;
	}

	// validation passed
	next();	
};

// validate update user request
userValidator.validateUpdate = function(userDetails, err, next) {

	var validationErrors = [];

	// check for empty or invalid user id (required 24 chars length)
	if (!userDetails.id || userDetails.id.length !== 24) {
		validationErrors.push({param: 'userId', value: userDetails.id, 
								message: 'A valid 24 character user id is required'});
	}

	if (validationErrors.length > 0) {
		// validation errors have been detected
		err(validationErrors);
		return;
	}

	// reuse create user validation
	userValidator.validateCreate(userDetails, err, next);
};

// validate delete user request
userValidator.validateDelete = function(userId, err, next) {

	var validationErrors = [];

	// check for empty or invalid user id (required 24 chars length)
	if (!userId || userId.length !== 24) {
		validationErrors.push({param: 'userId', value: userId, 
								message: 'A valid 24 character user id is required'});
	}

	if (validationErrors.length > 0) {
		// validation errors have been detected
		err(validationErrors);
		return;
	}

	// validation passed
	next();	
};

module.exports = userValidator;