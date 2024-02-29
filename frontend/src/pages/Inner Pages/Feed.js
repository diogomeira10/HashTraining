import { useState, useEffect } from "react"

export function Feed ({userId}) {


    const [posts, setPosts ] = useState([])


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
          }
        };
    
        fetchPosts();
      }, []);

      console.log(posts)
   

    return <div className="text-white">Feed</div>
}

