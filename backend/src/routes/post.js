const express = require("express")

const { 
    addPost,
    likePost,
    getPosts
} = require("../controllers/postControllers")


const router = express.Router();


//REQUEST HANDLERS

//adicionar um novo post
router.post('/addPost', addPost);

router.get("/getPosts", getPosts)

router.post('/post/:postId/like', likePost);


module.exports = router;

