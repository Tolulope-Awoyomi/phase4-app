import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => setUser(user));
      }
    });
  }, [])

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      
        
    </div>
  );
}

export default App;
