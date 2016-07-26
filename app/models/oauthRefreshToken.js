'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var OAuthRefreshTokensSchema = new mongoose.Schema({
    token: String,
    client_id: String,
    user_id: mongoose.Schema.ObjectId,
    expire_in: Date
});

OAuthRefreshTokensSchema.methods.setToken = function (email) {
    this.token = crypto.randomBytes(8).toString('hex');
};

OAuthRefreshTokensSchema.methods.setClientIdAndUserId = function (client_id, user_id) {
    this.client_id = client_id;
    this.user_id = user_id;
};

module.exports = mongoose.model('OAuthRefreshToken', OAuthRefreshTokensSchema, 'oauth_refresh_tokens');