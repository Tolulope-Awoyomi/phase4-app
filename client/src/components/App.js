import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

import Login from "../pages/Login";
import SignUpForm from "./SignupForm";


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

      <main>
        <Switch>
          <Route path="/new">
            <NewRecipe user={user} />
          </Route>
          <Route path="/">
            <RecipeList />
          </Route>
        </Switch>
      </main>
        
    </div>
  );
}

export default App;
