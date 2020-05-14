const mongoose = require('mongoose')
const Pair = require('../pairs/pairModel')

const collectionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  data: [Pair]
})

module.exports = mongoose.model('Collection', collectionSchema)
