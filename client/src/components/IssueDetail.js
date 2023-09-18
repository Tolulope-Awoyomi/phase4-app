import React, { useEffect, useState } from 'react';

function IssueDetail({ match }) {
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    // Fetch the issue details, including comments, based on the URL parameter
    fetch(`/issues/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => setIssue(data))
      .catch((error) => {
        console.error('Error fetching issue details:', error);
      });
  }, [match.params.id]);

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      {/* Display other issue details */}
      <h3>Comments</h3>
      <ul>
        {issue.comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default IssueDetail;
