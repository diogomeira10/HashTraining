import { useState, useEffect } from "react"
import { Post } from "../../components/Post";

export function Feed ({showProfile, setUsername, userLogedIn, filterSport}) {

  const [posts, setPosts ] = useState([])
  const [loading, setLoading] = useState(true);
  

  const renderedPosts = posts
  .filter((post) => {
    if (filterSport === 'all of them') {
      return true; // Show all posts
    } else {
      return post.sport === filterSport; // Filter posts based on selected sport
    }
  })
  .map((post) => (
    <Post
      showProfile={showProfile}
      setUsername={setUsername}
      key={post._id}
      sport={post.sport}
      content={post.content}
      imgUrl={post.imageUrl}
      username={post.username}
      userLogedIn={userLogedIn}
      postId={post._id}
    />
  ))
  .reverse();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/getPosts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }finally {
        setLoading(false); // Set loading state to false when done
      }
    };

    fetchPosts();
  }, []);
   

    return <div className="pt-16 pb-10 text-white mt-5 flex flex-col justify-center items-center">
    {loading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
      ) : (
        renderedPosts
      )}
  </div>
}

