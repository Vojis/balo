const mongoose = require('mongoose');
const getRandomNumber = require('../utils/randomNumber');

const CollectionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [20, 'Collection name can have up to 20 characters'],
    trim: true,
  },
  colorKey: {
    type: Number,
    default: getRandomNumber,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Collection', CollectionSchema);
