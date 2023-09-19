import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

function LoginOrSignup() {
    const { login, signup, loggedIn, user } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(true)
    
    return (
        <div id="login">
        <h1>STUDEBTHOOD</h1>
        <h4>Share your issues<br></br>
        someone who has experienced similar can help!</h4><br></br>
        
        {showLogin ? (
            <>
            <LoginForm />
            <p>Don't have an account?</p>
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </>
        ) : (
            <>
            <SignUpForm onLogin={login}/>
            <p>Already have an account?</p>
            <button onClick={() => setShowLogin(true)}>Log In</button>
            </>
        )}

        </div>
  )
}

export default LoginOrSignup