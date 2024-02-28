import { FaHome } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { PiPlugBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { useState } from "react"

export function Navbar ({setComponent}) {

    //NavBar SelectedAnimation
    const [selectedTab, setSelectedTab] = useState("home");

    

    return (
        <div className="navbar fixed bottom-0 w-full bg-white p-4 shadow-md">
          <nav className="flex justify-around">
            <a onClick={() => setComponent("home")}>
              <FaHome />
            </a>
            <a onClick={() => setComponent("add")}>
              <CgAdd />
            </a>
            <a onClick={() => setComponent("search")}>
              <IoSearch />
            </a>
            <a onClick={() => setComponent("friends")}>
              <PiPlugBold />
            </a>
            <a onClick={() => setComponent("profile")}>
              <FaUser />
            </a>
          </nav>
        </div>
      );
    }