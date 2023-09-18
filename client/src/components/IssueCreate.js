import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function IssueCreate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to create a new issue
    fetch('/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData(data)
        // Handle success, maybe redirect to the issue detail page
        navigate("/issues")
      })
      .catch((error) => {
        console.error('Error creating issue:', error);
      });
  };

  return (
    <div>
      <h2>Create Issue</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for issue title, description, category */}
        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
}

export default IssueCreate;
