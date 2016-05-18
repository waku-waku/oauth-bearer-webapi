'use strict';

var oauth2 = {};
var models = require('../models');

oauth2.saveUser = function (email, password) {

	return models.User
				.findOneAsync({email: email})
				.then(function (user) {
					if (!user) user = new models.User();
					if (user.is_activated) throw new Error('This user is already here.');

					user.updateTimestamp();
					user.setEmailAndPassword(email, password);
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


module.exports = oauth2;
