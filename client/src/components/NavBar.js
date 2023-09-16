import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <>
      <div>
        <Link to="/">Reciplease</Link>
      </div>
      <>
        <button as={Link} to="/new">
          New Recipe
        </button>
        <button variant="outline" onClick={handleLogoutClick}>
          Logout
        </button>
      </>
    </>
  );
}


export default NavBar;
