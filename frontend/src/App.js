import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreateAccount } from "./pages/CreateAccount";

function App() {
  return (
    <BrowserRouter>
      <div className="App">App</div>

      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
