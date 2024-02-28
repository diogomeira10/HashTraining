import logoExtenso from "../assets/Logo_em_texto.png";
import { RxHamburgerMenu } from "react-icons/rx";

export function Header() {
  return (
    <div className="pt-8">
      <div className="flex justify-between">
        <img className="w-44 ml-4" src={logoExtenso} />
        <div className="mr-4">
          <RxHamburgerMenu style={{ color: "white", fontSize: "2rem"}} />
        </div>
      </div>
    </div>
  );
}
