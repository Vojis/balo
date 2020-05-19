const mongoose = require('mongoose');

const PairSchema = mongoose.Schema({
  languageCollection: {
    type: mongoose.Schema.ObjectId,
    ref: 'Collection',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  language1: {
    type: String,
    required: [true, 'Value missing for this key'],
    maxlength: [500, 'Maximum 500 characters'],
  },
  language2: {
    type: String,
    required: [true, 'Value missing for this key'],
    maxlength: [500, 'Maximum 500 characters'],
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pair', PairSchema);
