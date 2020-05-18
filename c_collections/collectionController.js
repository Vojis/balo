const Collection = require('./collectionModel');
const asyncHandler = require('../middleware/asyncHandler');

const ErrorResponse = require('../utils/errorResponse');

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

exports.getCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find({ user: req.user }).select('-user');

  res.status(200).json({ success: true, data: collections, count: collections.length });
});

exports.getCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.find({ _id: req.params.id, user: req.user });

  res.status(200).json({
    success: true,
    data: collection,
  });
});
