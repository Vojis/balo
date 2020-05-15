const User = require('./userModel')
const asyncHandler = require('../middleware/asyncHandler')

// @desc    Register a user
// @route   POST /api/v1/auth/users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body
  const user = await User.create({ username, email, password })

  res.status(200).json({
    data: user,
    success: true,
  })
})
