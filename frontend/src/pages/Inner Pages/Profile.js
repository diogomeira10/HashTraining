import { FaBoltLightning } from "react-icons/fa6";

import { useState, useEffect } from "react";

export function Profile({userId, username}) {

  const [numberOfPosts, setNumberOfPosts] = useState(null)
  const [posts, setPosts ] = useState([])
  
  console.log(numberOfPosts)
  console.log(posts)

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
  }, []);

const renderedPosts = posts.map((post) => {
    return <img className='w-28 h-28 rounded' src={post.imageUrl} alt='post_image' />
  }) 
  
  console.log(renderedPosts)

  

  return (
    <div className="text-white pt-16 font-bold">
      <div className="flex justify-center mt-16 gap-6">
        <div className="flex-col w-20">
          <img className="rounded-full" src="https://ekcfbmsotzc.exactdn.com/en/blog/wp-content/uploads/2021/08/Soccer-Cristiano-Ronaldo.png?strip=all&lossy=1&ssl=1" alt="user_img" />
          <p>{username}</p>
        </div>

        <div>
          <div className="flex-col">
            <div className="flex justify-around gap-5">
              <p>{numberOfPosts}</p>
              <p>135</p>
              <p>33</p>
            </div>
            <div className="flex justify-around gap-5">
              <p>Posts</p> 
              <p>Connections</p>
              <p>Follows</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-14 border-b-2 border-blue-400 pb-4">
      <FaBoltLightning style={{color: "yellow"}} />
      <p>Invite to Train</p>
      </div>
      
         <div className='flex gap-4 mt-4 ml-3  flex-wrap h-full'>
      {renderedPosts}
      </div>
     
    </div>
  );
}