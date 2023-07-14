const express = require('express');
const { createUser } = require('./firstUser.controller');

const router = express.Router();

// Route for creating users
router.post('/users', createUser);

module.exports = router;
