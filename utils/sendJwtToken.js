/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

const sendJwtToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE },
  );

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 30 * 24 * 60 * 1000),
    httpOnly: true,
    // secure: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};

module.exports = sendJwtToken;
