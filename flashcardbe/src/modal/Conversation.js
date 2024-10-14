const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'User',
    },
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    }],
  }, {
    timestamps: true,
  });

module.exports = mongoose.model('Conversation', conversationSchema);
