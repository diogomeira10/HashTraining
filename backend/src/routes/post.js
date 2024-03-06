const express = require("express")

const { 
    addPost,
    likePost,
    getPosts,
    addComment,
    getLikesOfPost,
    getCommentsOfPost
} = require("../controllers/postControllers")


const router = express.Router();


//REQUEST HANDLERS

//adicionar um novo post
router.post('/addPost', addPost);

router.get("/getPosts", getPosts)

router.post('/post/:postId/like', likePost);

router.post('/post/addComment', addComment)

router.get('/post/getLikes/:postId', getLikesOfPost)

router.get('/post/getComments/:postId', getCommentsOfPost)


module.exports = router;

