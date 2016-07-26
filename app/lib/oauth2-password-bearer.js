'use strict';

var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var oauth2 = {};
var models = require('../models');


oauth2.saveUser = function (email, password, username, fullname) {

	if (!username || !fullname) throw new Error('username or fullname is not value.'); 

	return models.User
				.findOneAsync({username: username})
				.then(function (user) {
					if(user) throw new Error('This username is already here.');
					return models.User.findOneAsync({email: email});
				})
				.then(function (user) {
					if (!user) user = models.User();
					if (user.is_activated) throw new Error('This user is already here.');
					user.updateTimestamp();
					user.setEmailAndPassword(email, password);
					user.username = username;
					user.fullname = fullname;
					user.is_activated = true;

					return user.saveAsync();
				});
};

oauth2.saveOAuthAccessToken = function (email, clientId, user) {
	var accessToken = new models.OAuthAccessToken();
			accessToken.setToken(email);
			accessToken.setClientIdAndUserId(clientId, user._id);
			accessToken.expire_in = 3600;

	return accessToken.saveAsync();
};

oauth2.saveOAuthRefreshToken = function (email, clientId, user) {
	var refreshToken =  new models.OAuthRefreshToken();
			refreshToken.setToken(email);
			refreshToken.setClientIdAndUserId(clientId, user._id);
			refreshToken.expire_in = 3600;
			refreshToken.saveAsync();

	return user;
};

oauth2.compareUser = function (username, password) {
	return models.User
		.findOneAsync({username: username, is_activated: true})
		.then(function (user) {
			if (!user) throw new Error('Sorry, we were not able to find a user with that username and password.');
			if (user.comparePassword(password)) {
				return user;
			} else {
				throw new Error('Sorry, we were not able to find a user with that username and password.');
			}
		});
};


module.exports = oauth2;
