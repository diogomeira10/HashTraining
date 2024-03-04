import Logo from "../assets/logo_home.png";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';


export function CreateAccount({email, password, confirmPassword,  onChangePassword, onChangeEmail, onChangeConfirmPassword, imageProfile, onChangeImageProfile}) {

  const navigate = useNavigate()

  const handleAccountCreate = async () => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password, passwordConfirmation: confirmPassword, profileImage: imageProfile}),
      });

      if (response.ok) {
        console.log(response)
        console.log("success")
        navigate("/")
        // Handle successful response (e.g., redirect user to a new page)
      } else {
        // Handle error response (e.g., display error message to user)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="bg-black flex-col text-white h-screen w-screen flex items-center justify-center">
      <div className="">
        <img className="w-64" src={Logo} alt="logo" />
      </div>
      <div className="flex justify-center items-center">
        <form className="pl-4 flex-col">
            <div className="flex-col">
                <h3 className="text-white ">Username</h3>
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

            <div className="mt-8">
          <h3 className="text-white">Profile Image</h3>
          <input type="text" className="text-black rounded" value={imageProfile} onChange={onChangeImageProfile}/>
            </div>
        </form>
      </div>
      <div className="mt-6">
        <div>
          <button onClick={handleAccountCreate} className="font-bold">Create Account</button>
        </div>


        <Link to="/">
            <p className="font-bold">Login</p>
        </Link>
        
      </div>
    </div>
  );
}
