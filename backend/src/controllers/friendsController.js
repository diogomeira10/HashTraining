const Friend = require('../models/friendModel');

const addFriendShip = async (req,res) => {
    const {user1, user2} = req.body

    try {
        const friendship = await Friend.create({ user: user1, friend: user2 });
        res.status(200).json(friendship);
      } catch (error) {
        console.error('Error adding friendship:', error);
        throw error;
      }
}

// Accept a friend request
const acceptFriendRequest = async (req, res) => {
    const { user1Id, user2Id } = req.body;

    try {
        const friendship = await Friend.findOneAndUpdate(
            { user: user1Id, friend: user2Id },
            { status: 'accepted' },
            { new: true }
        );
        res.status(200).json(friendship);
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Retrieve friends for a user
const getFriends = async (req, res) => {
    const userId = req.params.userId;

    try {
        const friends = await Friend.find({ $or: [{ user: userId }, { friend: userId }], status: 'accepted' });
        res.status(200).json(friends);
    } catch (error) {
        console.error('Error retrieving friends:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a friendship record
const removeFriendship = async (req, res) => {
    const { user1Id, user2Id } = req.body;

    try {
        await Friend.findOneAndDelete({ $or: [{ user: user1Id, friend: user2Id }, { user: user2Id, friend: user1Id }] });
        console.log('Friendship removed successfully.');
        res.status(200).json({ message: 'Friendship removed successfully' });
    } catch (error) {
        console.error('Error removing friendship:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addFriendShip, acceptFriendRequest, getFriends, removeFriendship };
