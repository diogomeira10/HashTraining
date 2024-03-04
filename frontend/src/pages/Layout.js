import { Header } from "../components/Header";
import { Navbar } from "../components/NavBar";
import { useState } from "react";
import { Feed } from "./Inner Pages/Feed"
import { Profile } from "./Inner Pages/Profile"
import { Search } from "./Inner Pages/Search"
import { Friends } from "./Inner Pages/Friends"
import { AddPost } from "./Inner Pages/AddPost"


export function Layout ({userId, username})  {

  const [component, setComponent] = useState("home")
  const [showProfile, setShowProfile] = useState(false)
  const [selectedUsername, setSelectedUsername] = useState(null);
 

  console.log(selectedUsername)
  console.log(showProfile)

  const handleUsernameChange = (username) => {
    setSelectedUsername(username)
  }

  const handleShowProfile = () => {
    setShowProfile(true)
  }

  const goBack = () => {
    setShowProfile(false)
  }


  console.log(component)


  const renderComponent = () => {
    switch (component) {
      case "home":
        return <Feed userId={userId} username={username}/>;
      case "add":
        return <AddPost userId={userId} />;
      case "search":
        return showProfile ? <Profile goBack={goBack} username={selectedUsername} /> : <Search userId={userId} showProfile={handleShowProfile} setUsername={handleUsernameChange}/>;
      case "friends":
        return <Friends userId={userId}/>;
      case "profile":
        return <Profile userId={userId} username={username}/>;
      default:
        return null;
    }
  };


    return (
      <div className="">
        <div className="">
        <Header />

        </div>
        {<main>{renderComponent()}</main>}
        <Navbar setComponent={setComponent}/>
      </div>
    );
  };