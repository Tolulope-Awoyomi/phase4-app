import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./context/user";
import Home from "./Home";
import NavBar from "./NavBar";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./App.css"
import AllIssuesList from "../pages/AllIssuesList";
import IssueCard from "../pages/IssueCard";
import NewIssue from "../pages/NewIssue";
import UserReviews from "../pages/UserIssueList";
import UserIssueList from "../pages/UserIssueList";
import MyIssuesList from "../pages/MyIssuesList";

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
          <Route exact path="/" element={<AllIssuesList issues={issues} />} />
          <Route path="/issues" element={<AllIssuesList issues={issues} />} />
          <Route path="/issues/:id" element={<IssueCard issues={issues} setIssues={setIssues}/>} />
          <Route path="/new" element={<NewIssue handleAddIssue={handleAddIssue} />} />
          <Route path="/reviews" element={<UserIssueList issues={issues} setIssues={setIssues} />} />
          <Route path="/my-movies" element={<MyIssuesList />} />
        </Routes>

    </div>
  );
}

export default App;
