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
			return models.User.findOneAsync({_id: accessToken.user_id});
		})
		.done(function (user) {
			res.json({
				username: user.username,
				email: user.email
			});
		});
});


/**
 * GET /v1/users/:username
 */

router.get('/:username', function (req, res, next) {
	models.User
		.findOneAsync({username: username})
		.done(function (user) {
			res.json(user);
		});
});

module.exports = router;
