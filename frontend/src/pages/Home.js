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
        <button onClick={handleLogin}>
            <p className="font-bold">Login</p>
        </button>
        <Link to="/createAccount">
            <p className="font-bold">Criar Conta</p>
        </Link>
        
      </div>
    </div>
  );
}
