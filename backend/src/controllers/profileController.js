const Users = require("../models/userModel")
const Posts = require("../models/postModel")

const getNumberOfPostsOfUser = async (req, res) => {
    const { username } = req.params;

    try {
        const posts = await Posts.find({ username });
        const numberOfPosts = posts.length;

        res.status(200).json( {numberOfPosts} );

    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getPostsOfUser  = async (req,res) => {
    const { username } = req.params;

    try {
        const posts = await Posts.find({username})
        res.status(200).json({posts})
    } catch {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}




module.exports = {
    getNumberOfPostsOfUser,
    getPostsOfUser
}