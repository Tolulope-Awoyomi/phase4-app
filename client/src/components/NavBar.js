import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
    const {user, logout, loggedIn} = useContext(UserContext);
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
                <button>ALL ISSUES</button>
            </NavLink>
            <NavLink to="/my-issues">
                <button>MY ISSUES</button>
            </NavLink>  
            <NavLink to="/new-issue">
                <button>ADD NEW ISSUE</button>
            </NavLink> 
            <button onClick={logoutUser}>Logout</button> 
            <hr/>
            </nav>
            
          </div>
      );
  }
// }


export default NavBar;
