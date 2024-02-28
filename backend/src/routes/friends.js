const express = require("express")
const router = express.Router()

const {addFriendShip, acceptFriendRequest, getFriends, removeFriendship } = require("../controllers/friendsController")

router.post('/accept', acceptFriendRequest);
router.post('/add', addFriendShip)
router.get('/friends/:userId', getFriends);
router.delete('/remove', removeFriendship);

module.exports = router