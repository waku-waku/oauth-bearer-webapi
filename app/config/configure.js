'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var compression = require('compression');
var session = require('express-session');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
// var connectMongo = require('connect-mongo/es5');
// var passport = require('passport');
var path = require('path');
var morgan = require('morgan');
var config = require('./environments');

var configure = {};
// var MongoStore = connectMongo(session);

configure.defaultCall = function (app) {


  /**
   * Default call what express server settings.
   */
		
  app.set('views', config.root + '/app/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.disable('x-powered-by');
  app.use(morgan('dev'));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(cookieParser());

  
  /**
   * Session settings.
   */

  app.use(session({
  	secret: config.secret.session,
  	saveUnintialized: true,
  	resave: false,
  	// Sessionの永続化

  	// store: new MongoStore({
  	// 	mongooseConnection: mongoose.connection,
  	// 	db: 'luna'
  	// })
  }));

  
  /**
   *  Static file.
   */

  app.set('public', path.resolve('app/views'));
  app.use(express.static(app.get('public')));


  /**
   * Error Handling.
   */

  app.use(function (err, req, res, next) {
  	if (req.xhr) {
 	  res.status(500).send({ error: 'Something failed!' });
 	} else {
 	  next(err);
 	}
  });

};

module.exports = configure;
