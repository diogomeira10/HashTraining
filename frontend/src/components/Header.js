import logoExtenso from "../assets/Logo_em_texto.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { FilterMenu } from "../components/FilterMenu";

import { useState } from "react";

export function Header({onSportSelect}) {


  const [isOpen, setIsOpen] = useState(false)

  const closeBurgerMenu = () =>{
    setIsOpen(false)
  }
  


  const handleBurgerClick = () => {
    setIsOpen(!isOpen)
}


  return (
    <div className="pt-8 fixed top-0 w-full">
      <div className="flex justify-between">
        <img className="w-44 ml-4" src={logoExtenso} alt="logo"/>
        <div onClick={handleBurgerClick} className="mr-4">
          <RxHamburgerMenu style={{ color: "white", fontSize: "2rem"}} />
         
        </div> 
        
      </div>
      <div className='flex justify-end'>
        {isOpen && <FilterMenu onSportSelect={onSportSelect} closeBurgerMenu={closeBurgerMenu}/>}
      </div>
    </div>
  );
}
