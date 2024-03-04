const express = require("express")

const {
    getNumberOfPostsOfUser,
    getPostsOfUser,
    getUserProfileImage
} = require("../controllers/profileController")

const router = express.Router();

router.get("/numberOfPosts/:username", getNumberOfPostsOfUser);
router.get("/postsOfUser/:username", getPostsOfUser)
router.get("/profilePicture/:username", getUserProfileImage)

module.exports = router;