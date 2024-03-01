import { useState, useEffect } from "react"
import { Post } from "../../components/Post";

export function Feed ({username}) {

  const [posts, setPosts ] = useState([])
  const [loading, setLoading] = useState(true);
const renderedPosts = posts.map((post) => {
  
    return <Post content={post.content} imgUrl={post.imageUrl} 
    username={post.username}/> 
  })
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/getPosts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log(data)
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }finally {
        setLoading(false); // Set loading state to false when done
      }
    };

    fetchPosts();
  }, []);


  


      console.log(posts)
   

    return <div className="pt-16 pb-10 text-white mt-5 flex flex-col justify-center items-center">
    {loading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
      ) : (
        renderedPosts
      )}
  </div>
}

