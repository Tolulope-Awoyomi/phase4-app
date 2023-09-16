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

  if (loggedIn) {
    return (
        <div>
            <h1>Hello {user.username}</h1>
            <button onClick={logoutUser}>Logout</button>
            <hr/>
        </div>
    )
  } else {
    return (
          <div>
            <NavLink to="/login">
                <button>Login</button>
            </NavLink>
            <NavLink to="/signup">
                <button>Signup</button>
            </NavLink>
            <hr/>
          </div>
      );
  }
}


export default NavBar;
