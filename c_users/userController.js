const User = require('./userModel');
const asyncHandler = require('../middleware/asyncHandler');
const sendJwtToken = require('../utils/sendJwtToken');

const ErrorResponse = require('../utils/errorResponse');

// @desc    Register a user
// @route   POST /api/v1/users/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const messageObj = {};

  if (!username) {
    messageObj.username = 'Please add a username';
  }

  if (!email) {
    messageObj.email = 'Please add an email';
  }

  if (!password) {
    messageObj.password = 'Please add a password';
  }

  if (!username || !email || !password) {
    return next(ErrorResponse(messageObj, 400));
  }

  const user = await User.create({ username, email, password });

  sendJwtToken(user, 200, res);
});

// @desc    Log-in a user
// @route   POST /api/v1/users/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const messageObj = {};

  if (!email) {
    messageObj.email = 'Please add an email';
  }

  if (!password) {
    messageObj.password = 'Please add a password';
  }

  if (!email || !password) {
    return next(ErrorResponse(messageObj, 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(ErrorResponse('Invalid credentials', 404));
  }

  const passwordsMatch = await user.comparePasswords(password);
  if (!passwordsMatch) {
    return next(ErrorResponse('Invalid credentials', 401));
  }

  return sendJwtToken(user, 200, res);
});

// @desc    Logout a user
// @route   GET /api/v1/users/logout
// @access  Public
exports.logout = asyncHandler(async (req, res) => {
  const token = undefined;
  res
    .status(200)
    .cookie('token', token)
    .json({ success: true, token: {} });
});
