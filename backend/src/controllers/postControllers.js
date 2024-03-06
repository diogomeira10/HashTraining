const Post = require("../models/postModel")
const Users = require("../models/userModel")
const Session = require("../models/sessionModel")
const mongoose = require("mongoose")


//add Post
const addPost = async (req, res) => {
  try {
    const { content, author, imageUrl, sport } = req.body;

    // Fetch the user object using the author ID
    const existingUser = await Users.findById(author);

    if (!existingUser) {
      return res.status(400).json({ error: "Author not found" });
    }

    // Extract the username from the user object
    const { username } = existingUser;

    // Create the new post object with the username included
    const newPost = new Post({
      content,
      author: existingUser._id,
      imageUrl,
      username,
      sport

    });

    // Save the new post
    await newPost.save();

    // Return the new post object with the username included
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




// //Like Post
// const likePost = async (req, res) => {
//   const { postId } = req.params;
//   const { userId } = req.body;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const user = await Users.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }


//     const alreadyLikedIndex = post.likes.indexOf(user.username);
//     if (alreadyLikedIndex !== -1) {

//       post.likes.splice(alreadyLikedIndex, 1);
//       await post.save();
//       return res.status(200).json({ message: 'Post unliked successfully' });
//     } else {

//       post.likes.push(user.username);
//       await post.save();
//       return res.status(200).json({ message: 'Post liked successfully' , post, user});
//     }
//   } catch (error) {
//     console.error('Error liking/unliking post:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


const likePost = async (req, res) => {
  const { postId } = req.params;
  const { username } = req.body;

  try {
    // Find the user by their username
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the post by its ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const alreadyLikedIndex = post.likes.indexOf(username);
    if (alreadyLikedIndex !== -1) {
      // If already liked, remove the like
      post.likes.splice(alreadyLikedIndex, 1);
      await post.save();
      return res.status(200).json({ message: 'Post unliked successfully' });
    }

    // If not liked, add the like
    post.likes.push(username);
    await post.save();

    return res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getLikesOfPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likes = post.likes; // Extract the likes property from the post

    return res.status(200).json({ likes });
  } catch (error) {
    console.error('Error getting likes of post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



const addComment = async (req, res) => {

  const { username, content, postId } = req.body

  try {
    const post = await Post.findById(postId)

    if (!post) {
      throw new Error('Post not found');
    }

    post.comments.push({
      username,
      content
    });

    await post.save();

    res.status(200).json(post)

  } catch (error) {
    throw new Error(`Error adding comment: ${error.message}`);
  }

}


const getCommentsOfPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = post.comments; // Extract the comments property from the post

    return res.status(200).json({ comments });
  } catch (error) {
    console.error('Error getting comments of post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}





module.exports = {
  addPost,
  likePost,
  getPosts,
  addComment,
  getLikesOfPost, 
  getCommentsOfPost
}