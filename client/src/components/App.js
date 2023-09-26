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
import MyCommentsList from "../pages/MyCommentsList";
import MyIssuesList from "../pages/MyIssuesList";
import LoginOrSignup from "./LoginOrSignup";

function App() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true);
  const { user, login } = useContext(UserContext)

  useEffect(() => {
    fetch("/issues")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch issues");
        }
      })
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [setIssues]);

  if (!user) return <LoginForm />

  return (
    <div className="App">
        <NavBar />
          <Routes>
            <Route exact path="/" element={<LoginOrSignup />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/myhome" element={<UserHome  />} />
            <Route path="/issues" element={<AllIssuesList issues={issues} setIssues={setIssues} />} />
            <Route path="/issues/:id" element={<IssueCard issues={issues} setIssues={setIssues} />} />
            <Route path="/new-issue" element={<NewIssue />} />
            <Route path="/my-issues" element={<MyIssuesList />} />
          </Routes>
        
    </div>
  );
}

export default App;
