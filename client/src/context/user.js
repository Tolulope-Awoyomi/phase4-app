import React, { useState, useEffect } from 'react';

// Create context
const UserContext = React.createContext();


function UserProvider({ children }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setUser(data)
        })
    }, [])

    
  return (
    <div>user</div>
  )
}

export default user