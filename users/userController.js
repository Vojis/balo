const User = require('./userModel')

exports.createUser = async (req, res, next) => {
  const user = User.create(req.body)

  res.status(200).json({
    data: user,
    success: true,
  })
}
