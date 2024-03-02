import { FaHome } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { PiPlugBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

export function Navbar({ setComponent }) {
  //NavBar SelectedAnimation
  const [selectedTab, setSelectedTab] = useState("home");
  console.log(selectedTab);

  const handleHomeSelect = () => {
    setSelectedTab("home");
    setComponent("home");
  };
  const handleSearchSelect = () => {
    setSelectedTab("search");
    setComponent("search");
  };
  const handlePostSelect = () => {
    setSelectedTab("add");
    setComponent("add");
  };
  const handleFriendsSelect = () => {
    setSelectedTab("friends");
    setComponent("friends");
  };
  const handleProfileSelect = () => {
    setSelectedTab("profile");
    setComponent("profile");
  };

  return (
    <div className="navbar rounded-3xl fixed bottom-0 w-full bg-black p-4 shadow-md border-t-2" style={{ borderColor: '#419EF4' }}>

      <nav className="flex justify-around">
        <p
          onClick={handleHomeSelect}
          style={{
            fontSize: "24px",
            position: "relative",
            paddingBottom: selectedTab === "home" ? "8px" : "0",
          }}
        >
          <FaHome style={{color: "white"}}/>
          {selectedTab === "home" && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#419EF4",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </p>
        <p
          onClick={handleSearchSelect}
          style={{
            fontSize: "24px",
            position: "relative",
            paddingBottom: selectedTab === "search" ? "8px" : "0",
          }}
        >
          <IoSearch style={{color: "white"}}/>
          {selectedTab === "search" && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#419EF4",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </p>
        <p
          onClick={handlePostSelect}
          style={{
            fontSize: "24px",
            position: "relative",
            paddingBottom: selectedTab === "add" ? "8px" : "0",
          }}
        >
          <CgAdd style={{ color: "#419EF4", fontSize: "24px" }} />
          {selectedTab === "add" && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "white",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </p>
        <p
          onClick={handleFriendsSelect}
          style={{
            fontSize: "24px",
            position: "relative",
            paddingBottom: selectedTab === "friends" ? "8px" : "0",
          }}
        >
          <PiPlugBold style={{color: "white"}}/>
          {selectedTab === "friends" && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#419EF4",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </p>
        <p
          onClick={handleProfileSelect}
          style={{
            fontSize: "24px",
            position: "relative",
            paddingBottom: selectedTab === "profile" ? "8px" : "0",
          }}
        >
          <FaUser style={{color: "white"}}/>
          {selectedTab === "profile" && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#419EF4",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </p>
      </nav>
    </div>
  );
}
