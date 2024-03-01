const express = require("express")

const {getNumberOfPostsOfUser} = require("../controllers/profileController")

const router = express.Router();

router.get("/numberOfPosts/:username", getNumberOfPostsOfUser);

module.exports = router;