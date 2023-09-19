import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
  
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username: username, 
        password: password
      })
    })
    .then(res => res.json())
    .then(user => {
      if (!user.errors) {
        login(user);
        // navigate('/');
      } else {
        setUsername("");
        setPassword("");
        const errorListItems = user.errors.map((error, index) => (
          <li key={index}>{error}</li>
        ));
        setErrorsList(errorListItems);
      }
    });
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
      
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> <br /> <br />
    
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> <br /> <br />
      <input type="submit"></input>
    </form>
    
    <ul>
      {errorsList}
    </ul>
  </div>
  );
}

export default LoginForm;
