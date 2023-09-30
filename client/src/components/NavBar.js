import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../styles";

function NavBar() {
    const {logout } = useContext(UserContext);
    const navigate = useNavigate()

  function logoutUser() {
    fetch('/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        logout()
        navigate('/')
    })
  }

    return (
          <div className="header">
            <nav>
            <NavLink to="/issues">
                <Button>ALL ISSUES</Button>
            </NavLink>
            <NavLink to="/my-issues">
                <Button>MY ISSUES</Button>
            </NavLink>  
            <NavLink to="/new-issue">
                <Button>ADD NEW ISSUE</Button>
            </NavLink> 
            <Button onClick={logoutUser}>Login/Logout</Button> 
            </nav>
          </div>
      );
  }


export default NavBar;
