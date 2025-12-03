// routes/auth.js - usando controller
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// ==========================
//       LOGIN USER
// ==========================
router.post('/login', login);

// ==========================
//      REGISTER USER
// ==========================
router.post('/register', register);

module.exports = router;