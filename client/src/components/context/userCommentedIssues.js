import React, { useState, useEffect, useContext, createContext } from 'react';
import { UserContext } from './UserContext'; // Import your UserContext

const UserCommentedIssuesContext = createContext();

function UserCommentedIssuesProvider({ children }) {
  const { user } = useContext(UserContext);
  const [userCommentedIssues, setUserCommentedIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fetch user's commented issues when the user is available
      fetch(`/user/${user.id}/commented-issues`)
        .then((res) => res.json())
        .then((data) => {
          setUserCommentedIssues(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user commented issues:', error);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <UserCommentedIssuesContext.Provider value={{ userCommentedIssues, loading }}>
      {children}
    </UserCommentedIssuesContext.Provider>
  );
}

export { UserCommentedIssuesContext, UserCommentedIssuesProvider };
