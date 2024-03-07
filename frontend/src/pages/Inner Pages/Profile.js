import { FaBoltLightning } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useState, useEffect } from "react";

export function Profile({ username, goBack, userLogedIn, showBackButton }) {
  console.log(userLogedIn);

  const [numberOfPosts, setNumberOfPosts] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showIcon, setShowIcon] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [connections, setConnections] = useState(null);
  const [alreadyFriends, setAlreadyFriends] = useState(false)
  console.log(alreadyFriends)

  useEffect(() => {
    const getNumberOfPosts = async () => {
      try {
        const response = await fetch(`/api/numberOfPosts/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch number of posts");
        }
        const data = await response.json();
        setNumberOfPosts(data.numberOfPosts);
      } catch (error) {
        console.error("Error fetching number of posts:", error);
        setNumberOfPosts(null);
      }
    };

    const getPostsOfUser = async () => {
      try {
        const response = await fetch(`/api/postsOfUser/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setNumberOfPosts(null);
      }
    };

    const getProfileImage = async () => {
      try {
        const response = await fetch(`/api/profilePicture/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch number of posts");
        }
        const data = await response.json();
        setProfileImage(data.profileImage);
      } catch (error) {
        console.error("Error fetching number of posts:", error);
        setProfileImage(null);
      }
    };

    const getUserFriends = async () => {
      try {
        const response = await fetch(`/api/friends/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user friends");
        }
        const data = await response.json();
        setConnections(data.length);
        console.log(data)
        
        const areFriends = data.some(
          friend =>
            (friend.user === userLogedIn && friend.friend === username) ||
            (friend.user === username && friend.friend === userLogedIn)
        );
        setAlreadyFriends(areFriends);
        

      } catch (error) {
        console.error("Error fetching number of posts", error);
        setConnections(null);
      }
    };

    getProfileImage();
    getNumberOfPosts();
    getPostsOfUser();
    getUserFriends();
  }, [username, alreadyFriends]);

  useEffect(() => {
    setShowIcon(username !== userLogedIn);
  }, [username, userLogedIn]);

  const renderedPosts = posts.map((post) => {
    return (
      <img className="w-28 h-28 rounded" src={post.imageUrl} alt="post_image" />
    );
  });

  const addFriendShip = async () => {
    try {
      const response = await fetch("/api/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1: userLogedIn, user2: username }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Error adding friendship");
      }

      const friendship = await response.json();
      console.log("Friendship added:", friendship);
      return friendship;
    } catch (error) {
      console.error("Error adding friendship:", error.message);
      throw error;
    }
  };

  const removeFriendship = async () => {
    try {
      const response = await fetch('/api/friends/removeFriendship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1: userLogedIn, user2: username }),
      });
  
      if (!response.ok) {
        console.error('Error removing friendship:', response.statusText);
        throw new Error('Failed to remove friendship'); // Re-throw for handling
      }
  
      const data = await response.json(); // Might be empty on success
      console.log('Friendship removed:', data);
    } catch (error) {
      console.error('Error removing friendship:', error.message);
      // Handle errors gracefully (e.g., display an error message to the user)
    }
  };



  const handleLightningClick = async () => {
    try {
      if (alreadyFriends) {
        await removeFriendship();
      } else {
        const friendship = await addFriendShip();
        console.log("Friendship added:", friendship);
      }
      setAlreadyFriends((prev) => !prev); // Toggle the state
    } catch (error) {
      console.error("Error managing friendship:", error.message);
      // Handle any errors here
    }
  };
  

  return (
    <div className="text-white pt-16 font-bold">
      {showBackButton && (
        <div className="absolute text-3xl left-4" onClick={goBack}>
          <IoMdArrowRoundBack />
        </div>
      )}

      <div className="flex justify-around mt-16 gap-6">
        <div className="flex-col w-20">
          <img className="rounded-full" src={profileImage} alt="user_img" />
          <p>{username}</p>
        </div>

        <div className="relative">
          <div className="flex-col">
            <div className="flex justify-around gap-5">
              <p>{numberOfPosts}</p>
              <p>{connections}</p>
            </div>
            <div className="flex justify-around gap-5">
              <p>Posts</p>
              <p>Connections</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-11 top-52 border-blue-400 ">
        {showIcon && (
          <div onClick={handleLightningClick} className={`flex items-center justify-center w-10 h-10 border-2 border-blue-400 rounded-full cursor-pointer ${alreadyFriends ? 'text-blue' : 'text-yellow-500'}`}>
            {userLogedIn !== username && (
              <FaBoltLightning className="text-2xl" />
            )}
          </div>
        )}
      </div>
      <div className="">
        <div className="flex border-t-2 ml-2 mr-2 pt-6 border-blue-400 gap-4 mt-4 flex-wrap h-full">
          {renderedPosts}
        </div>
      </div>
    </div>
  );
}
