import React from 'react';

function IssueDelete({ match }) {
  const handleDelete = () => {
    // Send a DELETE request to delete the issue
    fetch(`/issues/${match.params.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Handle success, maybe redirect to the issues list
      })
      .catch((error) => {
        console.error('Error deleting issue:', error);
      });
  };

  return (
    <div>
      <h2>Delete Issue</h2>
      <button onClick={handleDelete}>Delete Issue</button>
    </div>
  );
}

export default IssueDelete;
