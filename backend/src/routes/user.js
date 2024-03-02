const express = require("express");
const {
  userSignUp,
  userLogin,
  getUser,
  getUserById,
  getAllUsers
} = require("../controllers/usersControllers");

const router = express.Router(); //Creating an instance of the express Router

//REQUEST HANDLERS

//criar um novo user
router.post("/auth/signup", userSignUp);

//login de um user
router.post("/auth/login", userLogin);

// get a user
router.get("/user", getUser);

//get a user by id
router.get("/user/:id", getUserById);

//get all users
router.get("/everyUser", getAllUsers)

module.exports = router;