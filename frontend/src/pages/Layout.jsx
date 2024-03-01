import { Header } from "../components/Header";
import { Navbar } from "../components/NavBar";
import { useState, useEffect } from "react";
import { Feed } from "./Inner Pages/Feed"
import { Profile } from "./Inner Pages/Profile"
import { Search } from "./Inner Pages/Search"
import { Friends } from "./Inner Pages/Friends"
import { AddPost } from "./Inner Pages/AddPost"


export function Layout ({userId, username})  {

  const [posts, setPosts ] = useState([])
  const [component, setComponent] = useState("home")
  console.log(component)

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

  const renderComponent = () => {
    switch (component) {
      case "home":
        return <Feed userId={userId} username={username} posts={posts}/>;
      case "add":
        return <AddPost userId={userId} />;
      case "search":
        return <Search userId={userId}/>;
      case "friends":
        return <Friends userId={userId}/>;
      case "profile":
        return <Profile userId={userId}/>;
      default:
        return null;
    }
  };


    return (
      <div className="h-screen bg-black">
        <Header />
        {<main>{renderComponent()}</main>}
        <Navbar setComponent={setComponent}/>
      </div>
    );
  };
  
