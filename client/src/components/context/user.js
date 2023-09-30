import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false) 

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
        setLoggedIn(true) 
    }

    function logout() {
        setUser({})
        setLoggedIn(false) 
    }

    function signup(user) {
        setUser(user)
        setLoggedIn(true) 
    }


  return (
    <UserContext.Provider value={{user, setUser, login, logout, signup, loggedIn}}>
        {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider};