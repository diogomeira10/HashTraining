import Logo from "../assets/logo_home.png";
import { Link } from "react-router-dom"


export function CreateAccount({email, password, confirmPassword,  onChangePassword, onChangeEmail, onChangeConfirmPassword}) {
  return (
    <div className="bg-black flex-col text-white h-screen w-screen flex items-center justify-center">
      <div className="">
        <img className="w-64" src={Logo} alt="logo" />
      </div>
      <div className="flex justify-center items-center">
        <form className="pl-4 flex-col">
            <div className="flex-col">
                <h3 className="text-white ">Email</h3>
                <input className="text-black rounded" type="text" value={email} onChange={onChangeEmail}/>
            </div>

            <div className="mt-8">
          <h3 className="text-white">Password</h3>
          <input type="password" className="text-black rounded" value={password} onChange={onChangePassword}  />
            </div>

            <div className="mt-8">
          <h3 className="text-white">Verify password</h3>
          <input type="password" className="text-black rounded" value={confirmPassword} onChange={onChangeConfirmPassword}/>
            </div>
        </form>
      </div>
      <div className="mt-6">
        <Link to="/">
            <p className="font-bold">Login</p>
        </Link>
        
      </div>
    </div>
  );
}
