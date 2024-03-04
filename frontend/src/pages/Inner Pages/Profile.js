import { FaBoltLightning } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";


import { useState, useEffect } from "react";

export function Profile({username, goBack, userLogedIn}) {

  console.log(userLogedIn)

  const [numberOfPosts, setNumberOfPosts] = useState(null)
  const [posts, setPosts ] = useState([])
  const [showIcon, setShowIcon] = useState(false); 



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

    getNumberOfPosts();
    getPostsOfUser()
  }, [username]);

  useEffect(() => {
    // Check if the profile being viewed is not the logged-in user's profile
    setShowIcon(username !== userLogedIn);
  }, [username, userLogedIn]);

const renderedPosts = posts.map((post) => {
    return <img className='w-28 h-28 rounded' src={post.imageUrl} alt='post_image' />
  }) 



  return (
    <div className="text-white pt-16 font-bold">
      {showIcon && (
        <div className='absolute text-3xl left-4' onClick={goBack}> 
        <IoMdArrowRoundBack />
        </div>
      )}
      

      <div className="flex justify-around mt-16 gap-6">

          <div className="flex-col w-20">
            <img className="rounded-full" src="https://ekcfbmsotzc.exactdn.com/en/blog/wp-content/uploads/2021/08/Soccer-Cristiano-Ronaldo.png?strip=all&lossy=1&ssl=1" alt="user_img" />
            <p>{username}</p>
          </div>

          <div>
            <div className="flex-col">
              <div className="flex justify-around gap-5">
                <p>{numberOfPosts}</p>
                <p>135</p>
                
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
        <div className="flex justify-center mt-14 border-b-2 border-blue-400 pb-4">
          <FaBoltLightning style={{color: "yellow"}} />
        </div>
      )}
      
      </div>
      
         <div className='flex gap-4 mt-4 ml-3  flex-wrap h-full'>
      {renderedPosts}
      </div>
     
    </div>
  );
}