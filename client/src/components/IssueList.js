import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Fetch the list of issues from your API when the component mounts
    fetch('/issues')
      .then((response) => response.json())
      .then((data) => setIssues(data))
      .catch((error) => {
        console.error('Error fetching issues:', error);
      });
  }, []);

  return (
    <div>
      <h2>Issues List</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link to={`/issues/${issue.id}`}>{issue.title}</Link>
          </li>
        ))}
      </ul>
      {/* Add links for creating, editing, and deleting issues */}
      <Link to="/issues/create">Create Issue</Link>
    </div>
  );
}

export default IssueList;
