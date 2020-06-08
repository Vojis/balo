const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createPair,
  getPairs,
  deletePair,
  editPair,
} = require('./pairsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protect, createPair)
  .get(protect, getPairs);

router
  .route('/:id')
  .put(protect, editPair)
  .delete(protect, deletePair);

module.exports = router;
