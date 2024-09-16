const mongoose = require('mongoose');

const questionPackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Tên gói đề
  },
  description: {
    type: String // Mô tả gói đề
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  semester: {
    type: String, // Ví dụ: 'Spring 2024', 'Fall 2023'
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard' // Danh sách các câu hỏi flashcard
  }],
  subject: {
    type: String, // Tên môn học liên quan đến gói đề
    required: true
  },
  imagePreview:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuestionPack', questionPackSchema);
