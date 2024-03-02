import logoExtenso from "../assets/Logo_em_texto.png";
import { RxHamburgerMenu } from "react-icons/rx";

export function Header() {
  return (
    <div className="pt-8 fixed top-0 w-full">
      <div className="flex justify-between">
        <img className="w-44 ml-4" src={logoExtenso} alt="logo"/>
        <div className="mr-4">
          <RxHamburgerMenu style={{ color: "white", fontSize: "2rem"}} />
        </div>
      </div>
    </div>
  );
}
