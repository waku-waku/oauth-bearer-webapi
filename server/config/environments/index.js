'use strict';

var path = require('path');


/**
 * Config.
 */

 var DB_NAME = process.env.DB_NAME;
 if (!DB_NAME) {
 	console.error('DB_NAME is not found.');
 	process.exit(-1);
}
var config = {
	env: process.env.NODE_ENV,

	root: path.normalize(__dirname + '/../../..'),

	port: process.env.PORT || 3000,

	ip: process.env.IP || 'localhost',

	db: {
		url: 'mongodb://localhost:27017/' + DB_NAME
	},

	seedDB: false,

	secret: {
		session: '********'
	}

};

console.log(config.root);

module.exports = config;
