const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createPair,
  getPairs,
} = require('./pairsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protect, createPair)
  .get(protect, getPairs);

module.exports = router;
