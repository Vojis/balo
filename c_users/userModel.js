const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [20, 'Username can have up to 20 characters'],
    trim: true,
    unique: true,
  },
  email: {
    type: String, 
    required: [true, 'Please add an email'],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePasswords = async function (incomingPassword) {
  return await bcrypt.compare(incomingPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
