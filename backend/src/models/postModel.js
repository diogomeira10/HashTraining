const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  imageUrl: {
    type: String,
    required: true
  },
  username: {
    type: String, 
    required: true
  },
  sport: { //added
    type: String,
    required: true
  }
},
{
    timestamps:true,
}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
