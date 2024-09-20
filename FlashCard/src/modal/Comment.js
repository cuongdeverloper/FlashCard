const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String // URL to the image if provided
  },
  flashcard: { // Updated field name
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard', // Reference to Flashcard instead of QuestionPack
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
