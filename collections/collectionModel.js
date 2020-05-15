const mongoose = require('mongoose')
const Pair = require('../pairs/pairModel')

const CollectionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  // data: [Pair]
  data: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Collection', CollectionSchema)
