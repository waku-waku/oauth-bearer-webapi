'use strict';

var models = require('../models');

var permission = {};

permission.authorization = function () {
	return function(req, res, next) {
  	var auth = req.headers.authorization;
  	var bearer = auth.toString().split(' ');

  	console.log(bearer[1]);
  	
  	if (bearer[0] === 'Bearer') {
  		models.OAuthAccessToken
  			.findOneAsync({token: bearer[1]})
  			.done(function (token) {
  				if (token) {
  					return next();
  				} else {
  					res.status(401);
  					res.header({'WWW-Authenticate': 'Bearer realm="example"'});
  					res.json({error: 'invalid_token'});
  				}
  			});
  	} else {
  		res.status(401);
  		res.header({'WWW-Authenticate': 'Bearer realm="example"'});
  		res.json({error: 'token_type is not bearer.'});
  	}
	};
};

module.exports = permission;
