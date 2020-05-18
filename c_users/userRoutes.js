const express = require('express');
// const protect = require('../middleware/')

const router = express.Router();
const {
  register,
  login,
  logout,
} = require('./userController');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
