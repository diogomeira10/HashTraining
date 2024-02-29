import { Header } from "../components/Header";
import { Navbar } from "../components/NavBar";
import { useState } from "react";
import { Feed } from "../pages/Inner Pages/Feed"
import { Profile } from "../pages/Inner Pages/Profile"
import { Search } from "../pages/Inner Pages/Search"
import { Friends } from "../pages/Inner Pages/Friends"
import { AddPost } from "../pages/Inner Pages/AddPost"


export function Layout ({userId})  {


  const [component, setComponent] = useState("home")
  console.log(component)

  const renderComponent = () => {
    switch (component) {
      case "home":
        return <Feed userId={userId}/>;
      case "add":
        return <AddPost userId={userId}/>;
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
        <main>{renderComponent()}</main>
        <Navbar setComponent={setComponent}/>
      </div>
    );
  };
  
