const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createPair,
  getPairs,
  deletePair,
} = require('./pairsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protect, createPair)
  .get(protect, getPairs);

router
  .route('/:id')
  .delete(protect, deletePair);

module.exports = router;
