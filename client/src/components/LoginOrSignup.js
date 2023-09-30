import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import { Button } from "../styles";

function LoginOrSignup() {
    const { login } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(true)
    
    return (
        <div id="login">
            <h1>STUDEBTHOOD</h1>
            <h3>Share your Student Debt issues...<br></br>
            A problem shared is a problem half-solved!</h3><br></br>
            
            {showLogin ? (
                <>
                <LoginForm />
                <p>Don't have an account?</p>
                <Button onClick={() => setShowLogin(false)}>Sign Up</Button>
                </>
            ) : (
                <>
                <SignUpForm onLogin={login}/>
                <p>Already have an account?</p>
                <Button onClick={() => setShowLogin(true)}>Log In</Button>
                </>
            )}
        </div>
  )
}

export default LoginOrSignup;