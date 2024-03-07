import { Link } from "react-router-dom"
import Logo from "../assets/logo_home.png";
import { useNavigate } from 'react-router-dom';

export function Home({ email, password, onChangeEmail, onChangePassword, handleToken, setUserId}) {

  const navigate = useNavigate()

  const handleLogin = async () => {
    console.log('hello')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        handleToken(data.token);
        setUserId(data._id)
        navigate('/layout')
      } else {
        console.error('Error logging in:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
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
                <h3 className="text-white mb-1">Username</h3>
                <input className="bg-gray-200 text-gray-800 rounded-lg p-2 text-sm max-w-xs" type="text" value={email} onChange={onChangeEmail} />
            </div>

            <div className="mt-8">
          <h3 className="text-white mb-1">Password</h3>
          <input className="bg-gray-200 text-gray-800 rounded-lg p-2 text-sm max-w-xs" onChange={onChangePassword} type="password" />
            </div>
        </form>
      </div>
      <div className="flex flex-col items-center gap-2 mt-6">
        <button onClick={handleLogin}>
            <p className="font-bold">Login</p>
        </button>
        <Link to="/createAccount">
            <p className="font-bold">Create Account</p>
        </Link>
      </div>
    </div>
  );
}
