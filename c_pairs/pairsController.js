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
