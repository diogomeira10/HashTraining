const express = require("express")
const router = express.Router()

const {addFriendShip, getFriends} = require("../controllers/friendsController")


router.post('/addFriend', addFriendShip)
router.get('/friends/:userId', getFriends);


module.exports = router