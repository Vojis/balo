const express = require('express');

const { protect } = require('../middleware/auth');
const {
  createCollection,
  updateCollection,
  getCollections,
  getCollection,
} = require('./collectionController');
const pairRouter = require('../c_pairs/pairRoutes');

const router = express.Router();
router.use('/:collectionId/pairs', pairRouter);


router
  .route('/')
  .post(protect, createCollection)
  .get(protect, getCollections);

router
  .route('/:id')
  .get(protect, getCollection)
  .put(protect, updateCollection);

module.exports = router;
