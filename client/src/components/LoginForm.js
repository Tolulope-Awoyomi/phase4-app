import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import { Error, FormField, Input, Label } from "../styles";

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
      <h3>Enter your login details</h3>
      <form onSubmit={handleSubmit}>
      
      <Label htmlFor="username">Username </Label>
      <Input
        type="text"
        id="username"
        autoComplete="off"
        placeholder="Enter your username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> <br /> 
    
      <Label htmlFor="password">Password </Label>
      <Input
        type="password"
        id="password"
        autoComplete="current-password"
        placeholder="Enter your password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> <br /> 
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
