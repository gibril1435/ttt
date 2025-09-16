const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Controller akan diimport nanti

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

module.exports = router; 