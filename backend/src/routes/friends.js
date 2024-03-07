const express = require("express")
const router = express.Router()

const {addFriendShip, getFriends,removeFriendship} = require("../controllers/friendsController")


router.post('/addFriend', addFriendShip)
router.get('/friends/:userId', getFriends);
router.post('/friends/removeFriendship', removeFriendship)


module.exports = router