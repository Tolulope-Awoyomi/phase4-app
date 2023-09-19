import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

function Login() {
    const { login, loggedIn, setLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    
    
    return (
        <div id="login">
        <h1>have you SEEN IT?</h1>
        <h4>review the movies you've seen.<br></br>
        watch the ones you haven't.</h4><br></br>
        
        {loggedIn ? (
            <>
            <LoginForm onLogin={login}/>
            <p>Don't have an account?</p>
            <button onClick={() => setLoggedIn(false)}>Sign Up</button>
            </>
        ) : (
            <>
            <SignUpForm onLogin={login}/>
            <p>Already have an account?</p>
            <button onClick={() => setLoggedIn(true)}>Log In</button>
            </>
        )}
        </div>
  )
}

export default Login