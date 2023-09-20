import { useState, useContext } from "react";

function NewComment({ handleAddComment, userId, issueId, user, setUser, issues }) {
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
        // Assuming userIssues is an array, we update it by adding the new issue
        setUser((prevUser) => ({
          ...prevUser,
          issues: [...prevUser.issues, issueFromForm],
        }));
      })
      .catch((err) => {
        setErrors(err);
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
      {errors?.map((err, index) => (
        <p key={index} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewComment;
