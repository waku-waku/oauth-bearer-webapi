'use strict';

var _ = require('underscore');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var uuid = require('node-uuid');
var moment = require('moment');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	is_activated: {
		type: Boolean,
		default: false,
		required: true
	},
	timestamp: {
		type: Number,
		required: true
	}
});


UserSchema.methods.setEmailAndPassword = function (email, password) {
    this.email = email;
    this.setHashedPassword(password);
};

UserSchema.methods.setHashedPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.updateTimestamp = function () {
    this.timestamp = moment().unix();
};

module.exports = mongoose.model('User', UserSchema, 'users');
