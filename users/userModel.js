const mongoose = require('mongoose')
const Collection = require('../collections/collectionModel')

const userSchema = mongoose.Schema({
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
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  collections: [Collection]
})

module.exports = mongoose.model('User', userSchema)
