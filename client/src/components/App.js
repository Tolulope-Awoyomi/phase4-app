import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import SignUpForm from "./SignupForm";
import Login from "./LoginForm";
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

  if (!user) return <Login />

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
