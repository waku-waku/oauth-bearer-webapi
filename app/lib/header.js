'use strict';

var header = {};

header.accessControlHeaders = function () {
	return function (req, res, next) {
		res.header({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
			'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
			'Cache-Control': 'no-store',
			'Pragma': 'no-cache'});
		next();	
	};
};


module.exports = header;
