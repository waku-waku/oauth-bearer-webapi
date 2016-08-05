'use strict';
 
var express = require('express');
 
var response = {};
 
express.response.sendjson = function (data, visible) {
	var obj = {};
	if (typeof visible !== 'undefined') {
		visible.forEach(function (key) {
			obj[key] = data[key];
		});
		return this.json(obj);
	}
	this.json(data);
};
 
express.response.senderror = function (data) {
 
};

module.exports = response;
