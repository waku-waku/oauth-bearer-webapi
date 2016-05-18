'use strict';

var express = require('express');
var models = require('../../models');

var router = express.Router();

/**
 * GET /v1/users/me
 */

router.get('/me', function (req, res, next) {
	var auth = req.headers.authorization;
  var bearer = auth.toString().split(' ');

	models.OAuthAccessToken
		.findOneAsync({token: bearer[1]})
		.then(function (accessToken) {
			if (!accessToken) throw new Error('accessToken is not here.');
			return models.User.findOneAsync({_id: accessToken.user_id});
		})
		.done(function (user) {
			res.json({
				_id: user._id,
				email: user.email
			});
		});
});

module.exports = router;
