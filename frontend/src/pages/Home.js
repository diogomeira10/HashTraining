import { Link } from "react-router-dom"
import Logo from "../assets/logo_home.png";

export function Home({ email, password, onChangeEmail, onChangePassword, userExists}) {
  return (
    <div className="bg-black flex-col text-white h-screen w-screen flex items-center justify-center">
      <div className="">
        <img className="w-64" src={Logo} alt="logo" />
      </div>
      <div className="flex justify-center items-center">
        <form className="pl-4 flex-col">
            <div className="flex-col">
                <h3 className="text-white ">Email</h3>
                <input className="text-black rounded" type="text" value={email} onChange={onChangeEmail} />
            </div>

            <div className="mt-8">
          <h3 className="text-white">Password</h3>
          <input className="text-black rounded" value={password} onChange={onChangePassword} type="password" />
            </div>
        </form>
      </div>
      <div className="mt-6">
        <Link to="/">
            <p className="font-bold">Login</p>
        </Link>
        <Link to="/createAccount">
            <p className="font-bold">Criar Conta</p>
        </Link>
        
      </div>
    </div>
  );
}
