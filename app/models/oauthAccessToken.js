'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var OAuthAccessTokensSchema = new mongoose.Schema({
    token: String,
    client_id: String,
    user_id: mongoose.Schema.ObjectId,
    expire_in: Date
});

// userの_idに紐付いて,一意のメールアドレスに対にtokenがある感じで

OAuthAccessTokensSchema.methods.setToken = function (email) {
    this.token = crypto.randomBytes(16).toString('hex');
};

OAuthAccessTokensSchema.methods.setClientIdAndUserId = function (client_id, user_id) {
    this.client_id = client_id;
    this.user_id = user_id;
};

module.exports = mongoose.model('OAuthAccessToken', OAuthAccessTokensSchema, 'oauth_access_tokens');