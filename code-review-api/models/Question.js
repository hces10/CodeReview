const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true
  },
  answersChat: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

module.exports = mongoose.model('Question', QuestionSchema);