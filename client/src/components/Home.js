import React, { useContext } from "react";
import { UserContext } from "./context/user";

function Home() {
    const { user } = useContext(UserContext)

    if (!user) {
        return (<h3>Please Login or Signup</h3>)
    } else {
        return (
            <div>
                <h3>{user.username} Home</h3>
            </div>
        )
    }
}

export default Home