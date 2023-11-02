import React, { useContext, useState } from "react";
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
import Header from "./Header";
import ChatPage from "../pages/AIChatPage";

function App() {
  const { user } = useContext(UserContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!user) return <LoginForm />

  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
        <NavBar />
        <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
          <Routes>
            <Route exact path="/" element={<LoginOrSignup />} />
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/myhome" element={<UserHome  />} />
            <Route path="/issues" element={<AllIssuesList />} />
            <Route path="/issues/:id" element={<IssueCard />} />
            <Route path="/new-issue" element={<NewIssue />} />
            <Route path="/my-issues" element={<MyIssuesList />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
    </div>
  );
}

export default App;
