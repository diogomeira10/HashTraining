const express = require("express")

const {
    getNumberOfPostsOfUser,
    getPostsOfUser
} = require("../controllers/profileController")

const router = express.Router();

router.get("/numberOfPosts/:username", getNumberOfPostsOfUser);
router.get("/postsOfUser/:username", getPostsOfUser)

module.exports = router;