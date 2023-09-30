import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";

function UserHome() {
    const { user, loggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    if (loggedIn) {
        return (
            <div>
                <h3>Welcome {user.username}!</h3>
                <h3>Welcome {user.email}!</h3>
                <h3>Welcome {user.image_url}!</h3>
                <h3>Welcome {user.bio}!</h3>
                <h4>Feel free to explore</h4>
            </div>
        )
    } else {
        navigate("/")
        return null
    }
}

export default UserHome;