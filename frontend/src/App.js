import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateAccount } from "./pages/CreateAccount";
import { useState } from "react";
import { Layout } from "./pages/Layout";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[token, setToken] = useState("")
  const [userId, setUserId] = useState("")
  console.log(userId)



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
              setUserId={setUserId}
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
        <Route path="/layout" element={<Layout userId={userId}/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
