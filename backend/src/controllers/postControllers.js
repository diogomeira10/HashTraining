const Post = require("../models/postSchema")
const Users = require("../models/userModel")
const Session = require("../models/sessionModel")
const mongoose = require("mongoose")



const addPost = async (req, res) => {

    try {
   
      const { title, content, author } = req.body;
  
    
      const existingUser = await User.findById(author);
      if (!existingUser) {
        return res.status(400).json({ error: "Author not found" });
      }
  
   
      const newPost = new Post({
        title,
        content,
        author: existingUser._id,
      });
  
  
      await newPost.save();
  
      
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error adding post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
module.exports = {
    addPost
}