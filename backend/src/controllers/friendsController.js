const Friend = require('../models/friendModel');

const addFriendShip = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        // Check if the friendship already exists
        const alreadyFriends = await Friend.findOne({ user: user1, friend: user2 });

        if (alreadyFriends) {
            // Friendship already exists, cancel it
            await Friend.findByIdAndDelete(alreadyFriends._id);
            console.log(`Canceled friendship between ${user1} and ${user2}`);
            res.status(200).json({ message: 'Friendship canceled' });
        } else {
            // Friendship doesn't exist, create it
            const friendship = await Friend.create({ user: user1, friend: user2 });
            console.log(`Friendship added between ${user1} and ${user2}`);
            res.status(200).json(friendship);
        }
    } catch (error) {
        console.error('Error adding/canceling friendship:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Retrieve friends for a user
const getFriends = async (req, res) => {
    const userId = req.params.userId;

    try {
        const friends = await Friend.find({ $or: [{ user: userId }, { friend: userId }]});
        res.status(200).json(friends);
    } catch (error) {
        console.error('Error retrieving friends:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { addFriendShip, getFriends };
