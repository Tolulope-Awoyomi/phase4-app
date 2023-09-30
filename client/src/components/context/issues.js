import React, { useState, useEffect } from 'react';

const IssuesContext = React.createContext();

function IssuesProvider({ children }) {
    const [issues, setIssues] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/issues")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Failed to fetch issues");
            }
          })
          .then((data) => {
            setIssues(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, [setIssues]);
      
  return (
    <IssuesContext.Provider value={{issues, setIssues, loading, setLoading}}>
        {children}
    </IssuesContext.Provider>
  )
}

export {IssuesContext, IssuesProvider};