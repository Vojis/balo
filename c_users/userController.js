const User = require('./userModel')
const asyncHandler = require('../middleware/asyncHandler')
const sendJwtToken = require('../utils/sendJwtToken')

// @desc    Register a user
// @route   POST /api/v1/auth/users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body
  const user = await User.create({ username, email, password })

  return sendJwtToken(user, 200, res)
})
