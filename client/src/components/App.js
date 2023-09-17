import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import { UserProvider } from "./context/user";
import SignUpForm from "./SignupForm";
import Login from "./Login";
import "./App.css"

function App() {

  return (
    <div className="App">
      <UserProvider> 
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>

    </div>
  );
}

export default App;
