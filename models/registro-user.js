var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true,unique: true}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Registro-user',schema);