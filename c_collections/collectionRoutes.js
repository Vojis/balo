const express = require('express');

const { createCollection } = require('./collectionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, createCollection);

module.exports = router;
