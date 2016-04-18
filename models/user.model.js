var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({	
	email: String,
	forename: String,
	surname: String,
	created: Date 
});

var user = mongoose.model('user', userSchema);

module.exports = user;