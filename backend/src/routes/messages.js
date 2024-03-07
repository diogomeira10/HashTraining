const express = require("express");
const router = express.Router();

const {
  getMessagesByUsername,
  getAllMessages,
  createMessage,
} = require("../controllers/messagesControllers.js");


router.get("/getAllMessages", getAllMessages)

router.post("/createMessage", createMessage)

router.get("/getUserMessages/:username", getMessagesByUsername);



module.exports = router;
