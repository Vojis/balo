const errorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.error('err', err);

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = errorResponse('Duplicate field value entered', 400);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = errorResponse('Resource not found', 404);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)[0];
    error = errorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error',
  });
};

module.exports = errorHandler;
