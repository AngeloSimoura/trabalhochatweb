var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');



var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    messages: [ {type: Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
}

module.exports.getUserByUsername = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports = mongoose.model('User',schema);