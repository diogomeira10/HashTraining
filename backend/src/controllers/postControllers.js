const Post = require("../models/postModel")
const Users = require("../models/userModel")
const Session = require("../models/sessionModel")
const mongoose = require("mongoose")


//add Post
const addPost = async (req, res) => {

    try {
   
      const {content, author, imageUrl } = req.body;
  
    
      const existingUser = await Users.findById(author);
      if (!existingUser) {
        return res.status(400).json({ error: "Author not found" });
      }
  
   
      const newPost = new Post({
        content,
        author: existingUser._id,
        imageUrl
      });
  
  
      await newPost.save();
  
      
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error adding post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const getPosts = async (req, res) => {
    try {
      const posts = await Post.find({})
      console.log(posts)
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error getting posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };




  //Like Post
  const likePost = async (req,res) => {
    const { postId } = req.params;
    const { userId } = req.body;

  try {
  
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

  
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'User has already liked the post' });
    }

    
    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
    
  }
  
  
module.exports = {
    addPost,
    likePost,
    getPosts
}