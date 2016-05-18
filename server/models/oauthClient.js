"use strict";

var mongoose = require('mongoose');

var OAuthClientsSchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true},
    client_secret: {
        type: String,
        required: true}
});

module.exports = mongoose.model('OAuthClient', OAuthClientsSchema, 'oauth_clients');
