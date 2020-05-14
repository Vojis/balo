const mongoose = require('mongoose')

const pairSchema = mongoose.Schema({
  collection: {
    type: mongoose.SchemaType.ObjectId,
    language1: {
      type: String,
      required: [true, 'Value missing for this key'],
      maxlength: [500, 'Maximum 500 characters']
    },
    language2: {
      type: String,
      required: [true, 'Value missing for this key'],
      maxlength: [500, 'Maximum 500 characters']
    },
    bookmarked: {
      type: Boolean,
      default: false,
    }
  }
})

module.exports = mongoose.Model('Pair', pairSchema)
