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
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br />

            <label htmlFor="email">Email Address</label>
            <input
                type="text"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /> <br />
     
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            /> <br />
      
            <label htmlFor="password">Password Confirmation</label>
            <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="current-password"
            /> <br />
      
            <label htmlFor="imageUrl">Profile Image</label>
            <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <label htmlFor="bio">Bio</label>
            <input
                type="text"
                rows="3"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            /> <br />
            <input type="submit"></input>
        </form>
        <ul>
            {errorsList}
        </ul>
    </div>
  );
}

export default SignUpForm;
