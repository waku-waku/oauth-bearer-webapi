'use strict';

var express = require('express');
var router = express.Router();
var permission = require('../../lib/permission');


/**
 * Routing.
 */

router.use('/auth', require('./auth'));
router.use('/users', permission.authorization(), require('./users'));

module.exports = router;
