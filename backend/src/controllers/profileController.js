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

const getUserProfileImage = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await Users.findOne({ username });
        if (user) {
            const profileImage = user.profileImage;
            res.status(200).json({ profileImage });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user profile image:", error);
        
    }
}



module.exports = {
    getNumberOfPostsOfUser,
    getPostsOfUser,
    getUserProfileImage
}