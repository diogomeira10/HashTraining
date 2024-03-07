import { Header } from "../components/Header";
import { Navbar } from "../components/NavBar";
import { useState, useEffect } from "react";
import { Feed } from "./Inner Pages/Feed"
import { Profile } from "./Inner Pages/Profile"
import { Search } from "./Inner Pages/Search"
import { Friends } from "./Inner Pages/Friends"
import { AddPost } from "./Inner Pages/AddPost"



export function Layout({ userId, username, userLogedIn }) {

  const [component, setComponent] = useState("home")
  const [showProfile, setShowProfile] = useState(false)
  const [showProfileInFeed,setShowProfileInFeed] = useState(false)
  const [showProfileInSearch,setShowProfileInSearch] = useState(false)
  const [selectedUsername, setSelectedUsername] = useState('');
  const [showHeader, setShowHeader] = useState(true); 

  const handleScroll = () => {
    const scrolled = window.scrollY;
    if (scrolled > 50) { // You can adjust this threshold as per your requirement
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showBackButton = true



  //FILTER POSTS LOGIC AND STATE
  const [filterSport, setFilterSport] = useState('all of them')
  console.log(filterSport)

  const handleSportSelect = (sport) => {
    setFilterSport(sport)
  }

  //---------------------------






  const handleUsernameChange = (username) => {
    setSelectedUsername(username)
  }

  const handleShowProfileInFeed = () => {
    setShowProfileInFeed(true)
  }
  const handleShowProfileInSearch = () => {
    setShowProfileInSearch(true)
  }


  const goBackInFeed = () => {
    setShowProfileInFeed(false)
  }
  const goBackInSearch = () => {
    setShowProfileInSearch(false)
  }




  const renderComponent = () => {
    switch (component) {
      case "home":
        return showProfileInFeed ? <Profile showBackButton={showBackButton} userLogedIn={userLogedIn} goBack={goBackInFeed} username={selectedUsername} /> : <Feed filterSport={filterSport} userLogedIn={userLogedIn} userId={userId} username={selectedUsername} showProfile={handleShowProfileInFeed} setUsername={handleUsernameChange} />;
      case "add":
        return <AddPost userId={userId} />;
      case "search":
        return showProfileInSearch ? <Profile userLogedIn={userLogedIn} showBackButton={showBackButton}  goBack={goBackInSearch} username={selectedUsername} /> : <Search userId={userId} showProfile={handleShowProfileInSearch} setUsername={handleUsernameChange} />;
      case "friends":
        return <Friends  userLogedIn={userLogedIn} userId={userId} />;
      case "profile":
        return <Profile userId={userId} username={username} userLogedIn={userLogedIn} />;
      default:
        return null;
    }
  };


  return (
    <div className="">
      <div className="">
      {showHeader && <Header onSportSelect={handleSportSelect} />}
      </div>
      {<main>{renderComponent()}</main>}
      <Navbar setComponent={setComponent} />
    </div>
  );
};