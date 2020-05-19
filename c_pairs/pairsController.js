const Pair = require('./pairModel');
const asyncHandler = require('../middleware/asyncHandler');

const ErrorResponse = require('../utils/errorResponse');

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
