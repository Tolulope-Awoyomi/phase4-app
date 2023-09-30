import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./context/user";
import UserHome from "./UserHome";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import "./App.css";
import AllIssuesList from "../pages/AllIssuesList";
import IssueCard from "../pages/IssueCard";
import NewIssue from "../pages/NewIssue";
import MyIssuesList from "../pages/MyIssuesList";
import LoginOrSignup from "./LoginOrSignup";

function App() {
  const { user } = useContext(UserContext);

  if (!user) return <LoginForm />

  return (
    <div className="App">
        <NavBar />
          <Routes>
            <Route exact path="/" element={<LoginOrSignup />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/myhome" element={<UserHome  />} />
            <Route path="/issues" element={<AllIssuesList />} />
            <Route path="/issues/:id" element={<IssueCard />} />
            <Route path="/new-issue" element={<NewIssue />} />
            <Route path="/my-issues" element={<MyIssuesList />} />
          </Routes>
    </div>
  );
}

export default App;
