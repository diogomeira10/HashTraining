const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  friend: {
    type: String,
    required: true
  },
},
{
  timestamps: true
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
