const express = require("express")

const { 
    addPost,
    likePost
} = require("../controllers/postControllers")


const router = express.Router();


//REQUEST HANDLERS

//adicionar um novo post
router.post('/addPost', addPost);

router.post('/post/:postId/like', likePost);


module.exports = router;

