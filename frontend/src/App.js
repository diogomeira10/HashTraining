import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateAccount } from "./pages/CreateAccount";
import { Feed } from "./pages/Feed";
import { useState /* useEffect */ } from "react";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[token, setToken] = useState("")
  console.log(email);
  console.log(password);
  console.log(newEmail);
  console.log(newPassword)
  console.log(token);



  //Handle Form Inputs
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleToken = (token) => {
    setToken(token)
  }

  //Fetching Functions
  //Login
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onChangePassword={handlePasswordChange}
              onChangeEmail={handleEmailChange}
              email={email}
              password={password}
              handleToken={handleToken}
            />
          }
        />
        <Route
          path="/createAccount"
          element={
            <CreateAccount
              email={newEmail}
              password={newPassword}
              confirmPassword={confirmPassword}
              onChangeEmail={handleNewEmailChange}
              onChangePassword={handleNewPasswordChange}
              onChangeConfirmPassword={handleConfirmPasswordChange}
            />
          }
        />
        <Route path="/feed" element={<Feed />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
