import { Header } from "../components/Header";
import { Navbar } from "../components/NavBar";
import { useState, useEffect } from "react";
import { Feed } from "./Inner Pages/Feed"
import { Profile } from "./Inner Pages/Profile"
import { Search } from "./Inner Pages/Search"
import { Friends } from "./Inner Pages/Friends"
import { AddPost } from "./Inner Pages/AddPost"



export function Layout ({userId, username, userLogedIn})  {

  const showLightning = true


  const [component, setComponent] = useState("home")
  const [showProfile, setShowProfile] = useState(false)
  const [selectedUsername, setSelectedUsername] = useState('');


 

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


  const renderComponent = () => {
    switch (component) {
      case "home":
        return showProfile ? <Profile /* userLogedIn={userLogedIn} */  goBack={goBack} username={selectedUsername} /> : <Feed userLogedIn={userLogedIn} userId={userId} username={selectedUsername} showProfile={handleShowProfile} setUsername={handleUsernameChange}/>;
      case "add":
        return <AddPost userId={userId} />;
      case "search":
        return showProfile ? <Profile goBack={goBack} username={selectedUsername} /> : <Search userId={userId} showProfile={handleShowProfile} setUsername={handleUsernameChange}/>;
      case "friends":
        return <Friends userLogedIn={userLogedIn} userId={userId}/>;
      case "profile":
        return <Profile userId={userId} username={username} userLogedIn={userLogedIn}/>;
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