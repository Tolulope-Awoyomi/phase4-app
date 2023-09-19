import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./context/user";
import Home from "./Home";
import NavBar from "./NavBar";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./App.css"

function App() {
  const [issues, setIssues] = useState([])
  const { user, login } = useContext(UserContext)

  useEffect(() => {
    fetch("/issues")
    .then(r => r.json())
    .then(issues => setIssues(issues))
  }, [])

  function handleAddIssue(newIssue) {
    setIssues([newIssue, ...issues])
  }

  if (!user) return <LoginForm />

  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

    </div>
  );
}

export default App;
