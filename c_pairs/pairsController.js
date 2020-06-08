const Pair = require('./pairModel');
const asyncHandler = require('../middleware/asyncHandler');

const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a pair
// @route   POST /api/v1/collections/:collectionId/pairs
// @access  Private
exports.createPair = asyncHandler(async (req, res, next) => {
  const { collectionId } = req.params;
  const { language1, language2 } = req.body;

  if (!language1 || !language2) {
    return next(ErrorResponse('Please add both language keys', 400));
  }

  const pair = await Pair.create({
    languageCollection: collectionId,
    user: req.user.id,
    language1,
    language2,
  });

  res.status(200).json({
    success: true,
    data: pair,
  });
});

// @desc    Get all pairs for a collection
// @route   POST /api/v1/collections/:collectionId/pairs
// @access  Private
exports.getPairs = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const user = req.user.id;

  const pairs = await Pair.find({ languageCollection: collectionId, user });

  res.status(200).json({
    success: true,
    data: pairs,
    count: pairs.length,
  });
});

// @desc    Delete a pair
// @route   DELETE /api/v1/collections/:collectionId/pairs/:id
// @access  Private
exports.deletePair = asyncHandler(async (req, res) => {
  await Pair.findByIdAndDelete({ _id: req.params.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Edit a pair
// @route   PUT /api/v1/collections/:collectionId/pairs/:id
// @access  Private
exports.editPair = asyncHandler(async (req, res) => {
  const { language1, language2 } = req.body;
  const payload = {};
  if (language1) {
    payload.language1 = language1;
  }

  if (language2) {
    payload.language2 = language2;
  }

  const pair = await Pair.findByIdAndUpdate({ _id: req.params.id }, payload, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: pair,
  });
});
