const express = require('express');

const { protect } = require('../middleware/auth');
const {
  createCollection,
  getCollections,
  getCollection,
} = require('./collectionController');

const router = express.Router();

router
  .route('/')
  .post(protect, createCollection)
  .get(protect, getCollections);

router
  .route('/:id')
  .get(protect, getCollection);

module.exports = router;
