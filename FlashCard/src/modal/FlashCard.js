const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: false
  },
  questionImage: {
    type: String,
    required: false 
  },
  answers: {
    type: [String], 
    required: true,
    validate: {
      validator: function(val) {
        return val.length === 4;
      },
      message: 'There must be exactly 4 answers'
    }
  },
  correctAnswers: {
    type: [Number],
    required: true,
    validate: {
      validator: function(indices) {
        return indices.every(index => index >= 0 && index < this.answers.length);
      },
      message: 'All correct answer indices must be within the bounds of the answers array'
    }
  },
  questionPack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionPack', 
    required: true
  },
 
}, { timestamps: true });

module.exports = mongoose.model('Flashcard', flashcardSchema);
