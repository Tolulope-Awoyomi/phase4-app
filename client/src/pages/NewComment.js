import React, { useState } from "react";
import { Button, Error, FormField } from "../styles";

function NewComment({ handleAddComment, userId, issueId, setUser }) {
  const [commentContent, setCommentContent] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      issue_id: issueId,
      user_id: userId,
      content: commentContent,
    };

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((err) => Promise.reject(err.errors));
        }
      })
      .then((issueFromForm) => {
        setCommentContent("");
        setErrors([]);
        handleAddComment(issueFromForm.issues_with_comments);
        setUser((prevUser) => ({
          ...prevUser,
          issues: [...prevUser.issues, issueFromForm],
        }));
      })
      .catch((err) => {
        const errorMessages = err || ["An error occurred"]; 
        setErrors(errorMessages);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Comment</h2>
      <div>
        <label htmlFor="review">Comment</label>
        <input
          type="text"
          id="review"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </div>
      <FormField>
            {errors?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default NewComment;
