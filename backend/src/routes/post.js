const express = require("express")

const { addPost } = require("../controllers/postControllers")


const router = express.Router();


//REQUEST HANDLERS

//adicionar um novo post
router.post('/addPost', addPost);
