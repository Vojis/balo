const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createPair,
} = require('./pairsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protect, createPair);

module.exports = router;
