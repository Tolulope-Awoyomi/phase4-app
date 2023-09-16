import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import { UserProvider } from "./context/user";
import SignUpForm from "./SignupForm";
import Login from "../pages/Login";


function App() {
  // const [user, setUser] = useState(null);


  return (
    <div className="App">
      <UserProvider> 
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </UserProvider>

    </div>
  );
}

export default App;
