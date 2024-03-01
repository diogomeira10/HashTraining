import { useState, useEffect } from "react"
import { Post } from "../../components/Post";

export function Feed ({username, posts}) {


  const renderedPosts = posts.map((post) => {
  
    return <Post content={post.content} imgUrl={post.imageUrl} 
    username={post.username}/> 
  })


      console.log(posts)
   

    return <div className="text-white mt-5 flex flex-col justify-center items-center">
      {renderedPosts}
      </div>
}

