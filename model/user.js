var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true,
	},
	phoneNumber:{
		type: Number,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	}
});

var User = module.exports = mongoose.model('User', userSchema);