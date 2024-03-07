const Message = require("../models/messageModel")
const Users = require("../models/userModel")

const mongoose = require("mongoose")


const createMessage = async (req, res) => {


    const {sender, receiver, content} = req.body

    try {
      const message = await Message.create({sender, receiver, content});
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create message' });
    }
  };
  

  const getAllMessages = async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  };
  

  const getMessagesByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const messages = await Message.find({ $or: [{ sender: username }, { receiver: username }] });

        if (messages.length === 0) {
            return res.status(404).json({ message: "No messages found" });
        }

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};
  

  module.exports = {
    createMessage,
    getAllMessages, 
    getMessagesByUsername
}