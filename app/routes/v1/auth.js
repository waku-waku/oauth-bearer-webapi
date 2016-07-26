'use strict';

var express = require('express');
var models = require('../../models');
var oauth2 = require('../../lib/oauth2-password-bearer');

var router = express.Router();


/**
 * POST /v1/auth/signup
 */


router.post('/signup', function (req, res) {

	models.OAuthClient
		.findOneAsync({client_id: req.body.client_id, client_secret: req.body.client_secret})
		.then(function (client) {
			if (!client) throw new Error('client_id or client_secret is invalid.');
			return oauth2.saveUser(req.body.email, req.body.password, req.body.username, req.body.fullname);
		})
		.then(function (user) {
			return oauth2.saveOAuthRefreshToken(req.body.email, req.body.client_id, user);
		})
		.then(function (user) {
			return oauth2.saveOAuthAccessToken(req.body.email, req.body.client_id, user);
		})
		.catch(function (err) {
			res.status(400);
			res.send({
				error: err.toString()
			});
		})
		.done(function (msg) {
			res.json(msg);
		});
});


/**
 * POST /v1/auth/token
 */

router.post('/token', function (req, res) {

	var token = {};

	// console.log(req.body);
	if (req.body.grant_type === 'password') {
		models.OAuthClient
			.findOneAsync({client_id: req.body.client_id, client_secret: req.body.client_secret})
			.then(function (client) {
				if (!client) throw new Error('Client Id or Client Secret is invalid.');
				// return models.User.findOneAsync({username: req.body.username, is_activated: true});
				return oauth2.compareUser(req.body.username, req.body.password);
			})
			.then(function (user) {
				return models.OAuthAccessToken.findOneAsync({user_id: user._id});
			})
			.then(function (accessToken) {
				if (!accessToken) throw new Error('accessToken is not here.');
				token.token_type = 'bearer';
				token.access_token = accessToken.token;
				token.expire_in = 3600;
				return accessToken.user_id;
			})
			.then(function (userId) {
				return models.OAuthRefreshToken.findOneAsync({user_id: userId});
			})
			.catch(function (err) {
				console.dir(err);
				res.stauts(400);
				res.send({
					error: err.toString()
				});
			})
			.done(function (refreshToken) {
				if (!refreshToken) throw new Error('refreshToken is not here.');
				token.refresh_token = refreshToken.token;
				res.json(token);
			});
	} else {
		res.status(400);
		res.json({error: 'invalid_grant'});
	}

});


module.exports = router;
