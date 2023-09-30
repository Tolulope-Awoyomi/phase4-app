import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import { Error, FormField } from "../styles";

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
        navigate('/myhome');
      } else {
        setUsername("");
        setPassword("");
        const errorListItems = user.errors.map((error, index) => (
          <p key={index}>{error}</p>
        ));
        setErrorsList(errorListItems);
      }
    });
  }
  
  return (
    <div>
      <h4>Enter your login details</h4>
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
    
    <FormField>
      {errorsList?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
    </FormField>
  </div>
  );
}

export default LoginForm;
