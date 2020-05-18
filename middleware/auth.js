const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('./asyncHandler')

exports.protect = async(async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return next(ErrorResponse('Not authorized to access this route'), 401)
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)
    next()
  } catch (error) {
    return next(ErrorResponse('Not authorized to access this route'), 401)    
  }
})
