/**
 * Main Application File
 */

'use strict';



/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = require('./routes/v1');
mongoose.Promise = require('bluebird');
var config = require('./config/environments');
var header = require('./lib/header.js');
var server = require('http').createServer(app);


/**
 * Connect DB.
 */

mongoose.connect(config.db.url);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});


/**
 * Configure Express Server.
 */

require('./config/configure').defaultCall(app);


/**
 * header dependencies.
 */

app.use(header.accessControlHeaders());


/**
 * API Routing.
 */

app.use('/api/v1', router);


/**
 * Test API.
 */

app.get('/header', function (req,res) {
	console.log(res.connection._httpMessage.socket._httpMessage);
	res.json({
		username: 'test successful!'
	});
});


/**
 * Start Server.
 */


app.setup = server.listen(config.port, config.ip, function() {
	console.log('Express server listening on %d ...', config.port);
});
