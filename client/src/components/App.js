import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./context/user";
import UserHome from "./UserHome";
import NavBar from "./NavBar";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./App.css"
import AllIssuesList from "../pages/AllIssuesList";
import IssueCard from "../pages/IssueCard";
import NewIssue from "../pages/NewIssue";
import UserIssueList from "../pages/UserIssueList";
import MyIssuesList from "../pages/MyIssuesList";
import LoginOrSignup from "./LoginOrSignup";

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
          <Route exact path="/" element={<LoginOrSignup issues={issues} />} />
          <Route exact path="/loginform" element={<LoginForm issues={issues} />} />
          <Route exact path="/myhome" element={<UserHome  />} />
          <Route path="/issues" element={<AllIssuesList issues={issues} />} />
          <Route path="/issues/:id" element={<IssueCard issues={issues} setIssues={setIssues}/>} />
          <Route path="/new" element={<NewIssue handleAddIssue={handleAddIssue} />} />
          <Route path="/comments" element={<UserIssueList issues={issues} setIssues={setIssues} />} />
          <Route path="/my-issues" element={<MyIssuesList />} />
        </Routes>

    </div>
  );
}

export default App;
