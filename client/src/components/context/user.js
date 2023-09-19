import React, { useState, useEffect } from 'react';

// Create context
const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false) // add loggedIn flag

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            if (!data.errors) {
                setUser(data)
                setLoggedIn(true)
            } else  {
                setUser({})
                setLoggedIn(false)
            }
        })
    }, [])

    function login(user) {
        setUser(user)
        setLoggedIn(true) // set loggedIn flag
    }

    function logout() {
        setUser({})
        setLoggedIn(false) // set loggedIn flag
    }

    function signup(user) {
        setUser(user)
        setLoggedIn(true) // set loggedIn flag
    }


  return (
    // add loggedIN to global state
    <UserContext.Provider value={{user, login, logout, signup, loggedIn}}>
        {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider };