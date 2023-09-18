import React, { useEffect, useState } from 'react';

function IssueEdit({ match }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    // Fetch issue details based on the URL parameter
    fetch(`/issues/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => {
        console.error('Error fetching issue details:', error);
      });
  }, [match.params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PATCH request to update the issue
    fetch(`/issues/${match.params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success, maybe redirect to the issue detail page
      })
      .catch((error) => {
        console.error('Error updating issue:', error);
      });
  };

  return (
    <div>
      <h2>Edit Issue</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for editing issue title, description, category */}
        <button type="submit">Update Issue</button>
      </form>
    </div>
  );
}

export default IssueEdit;
