import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

function SignUpForm( ) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        bio: bio
      }),
    })
    .then(res => res.json())
    .then(user => {
        if (!user.errors) {
            signup(user)
            navigate('/')
        } else {
            setUsername("")
            setEmail("")
            setPassword("")
            setPasswordConfirmation("")
            setImageUrl("")
            setBio("")
            const errorLis = user.errors.map(e => <li key={e}>{e}</li>)
            setErrorsList(errorLis)
        }
    })
    
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                autoComplete="off"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br /> <br />

            <label htmlFor="email">Email Address: </label>
            <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /> <br /> <br />
     
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
            /> <br /> <br />
      
            <label htmlFor="password">Password Confirmation: </label>
            <input
                type="password"
                id="password_confirmation"
                autoComplete="new-password"
                placeholder="Confirm your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                
            /> <br /> <br />
      
            <label htmlFor="imageUrl">Profile Image: </label>
            <input
                type="file"
                id="imageUrl"
                accept="image/*"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            /> <br /> <br />

            <label htmlFor="bio">About Me: </label>
            <textarea
                id="bio"
                placeholder="Write a little about yourself (optional)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            ></textarea> <br /> <br />
            <input type="submit"></input>
        </form>
        <ul>
            {errorsList}
        </ul>
    </div>
  );
}

export default SignUpForm;
