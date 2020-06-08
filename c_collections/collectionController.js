const Collection = require('./collectionModel');
const Pairs = require('../c_pairs/pairModel');
const asyncHandler = require('../middleware/asyncHandler');

const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a collection
// @route   POST /api/v1/collections
// @access  Private
exports.createCollection = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const { name } = req.body;

  if (!name) {
    return next(ErrorResponse('Please add a name', 400));
  }

  const listOfCollections = await Collection.find({ user: req.body.user, name });

  if (listOfCollections.length > 0) {
    return next(ErrorResponse('Collection name already exists', 400));
  }

  const collection = await Collection.create(req.body);
  res.status(200).json({ success: true, data: collection });
});

// @desc    Update a collection
// @route   PUT /api/v1/collections/:id
// @access  Private
exports.updateCollection = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    return next(ErrorResponse('Please add a name', 400));
  }

  let collection = await Collection.findById(id);
  if (!collection) {
    return next(ErrorResponse('Collection does not exist', 400));
  }

  collection = await Collection.findByIdAndUpdate(id, { name }, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: collection });
});

// @desc    Get all collections for a user
// @route   POST /api/v1/collections
// @access  Private
exports.getCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find({ user: req.user }).select('-user');

  res.status(200).json({ success: true, data: collections, count: collections.length });
});

// @desc    Get a specific collection
// @route   POST /api/v1/collections/:id
// @access  Private
exports.getCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.find({ _id: req.params.id, user: req.user });

  res.status(200).json({
    success: true,
    data: collection,
  });
});

// @desc    Delete a collection
// @route   DELETE /api/v1/collections/:id
// @access  Private
exports.deleteCollection = asyncHandler(async (req, res) => {
  await Collection.findByIdAndDelete({ _id: req.params.id });
  await Pairs.deleteMany({ languageCollection: req.params.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});
