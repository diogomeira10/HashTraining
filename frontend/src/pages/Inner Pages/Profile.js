import { FaBoltLightning } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";


import { useState, useEffect } from "react";

export function Profile({username, goBack, userLogedIn, showLightning}) {

  console.log(userLogedIn)

  const [numberOfPosts, setNumberOfPosts] = useState(null)
  const [posts, setPosts ] = useState([])
  const [showIcon, setShowIcon] = useState(false); 
  const [profileImage, setProfileImage] = useState(null)
  const [connections, setConnections] = useState(null)
  

  
  // console.log(profileImage)
  // console.log(username)
  // console.log(userLogedIn)
  // console.log(connections) 
  //  console.log(connectionsList)


  useEffect(() => {
    const getNumberOfPosts = async () => {
      try {
        const response = await fetch(`/api/numberOfPosts/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch number of posts');
        }
        const data = await response.json();
        setNumberOfPosts(data.numberOfPosts);
      } catch (error) {
        console.error('Error fetching number of posts:', error);
        setNumberOfPosts(null);
      }
    };

    const getPostsOfUser = async () => {
      try {
        const response = await fetch(`/api/postsOfUser/${username}`)
        if(!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json()
        setPosts(data.posts)
      } catch (error) {
        console.error('Error fetching posts:', error);
        setNumberOfPosts(null);
      }
    }

    const getProfileImage = async () => {
      try {
        const response = await fetch(`/api/profilePicture/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch number of posts');
        }
        const data = await response.json();
        setProfileImage(data.profileImage);
      } catch (error) {
        console.error('Error fetching number of posts:', error);
        setProfileImage(null);
      }
    };


    const getUserFriends = async () => {
      try{
        const response = await fetch(`/api/friends/${username}`)
        if(!response.ok) {
          throw new Error('Failed to fetch user friends');
        }
        const data = await response.json()
        setConnections(data.length)
        /* setConnectionsList(data) */
      } catch (error) {
        console.error('Error fetching number of posts', error);
        setConnections(null);
      }
    }

    getProfileImage()
    getNumberOfPosts();
    getPostsOfUser()
    getUserFriends()
  }, [username]);

  useEffect(() => {
    setShowIcon(username !== userLogedIn);
  }, [username, userLogedIn]);

const renderedPosts = posts.map((post) => {
    return <img className='w-28 h-28 rounded' src={post.imageUrl} alt='post_image' />
  }) 


  const addFriendShip = async () => {
    try {
      const response = await fetch('/api/addFriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1: userLogedIn, user2: username }),
      });
  
      if (!response.ok) {
        console.log(response)
        throw new Error('Error adding friendship');
      }
  
      const friendship = await response.json();
      console.log('Friendship added:', friendship);
      return friendship;
    } catch (error) {
      console.error('Error adding friendship:', error.message);
      throw error;
    }
  }

  const handleLightningClick = () => {
    addFriendShip()
  }



  return (
    <div className="text-white pt-16 font-bold">
      {showIcon && (
        <div className='absolute text-3xl left-4' onClick={goBack}> 
        <IoMdArrowRoundBack />
        </div>
      )}
      

      <div className="flex justify-around mt-16 gap-6">

          <div className="flex-col w-20">
            <img className="rounded-full" src={profileImage} alt="user_img" />
            <p>{username}</p>
          </div>

          <div>
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
      <div className="flex justify-center mt-14 border-b-2 border-blue-400 pb-4">
      {showIcon && (
        <div onClick={handleLightningClick} className="flex justify-center mt-14 border-b-2 border-blue-400 pb-4">
          <FaBoltLightning style={{color: "yellow"}} />
        </div>
      )}
      </div>
         <div className='flex gap-4 mt-4 ml-3 flex-wrap h-full'>
      {renderedPosts}
      </div>
     
    </div>
  );
}