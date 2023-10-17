import React, { useState, useContext, useEffect } from "react";
import { Button, Error, FormField, Label, Input } from "../styles";
import { IssuesContext } from "../components/context/issues";

function NewComment({ issueId, setUser, user, userId }) {
  const [commentContent, setCommentContent] = useState("");
  const [errors, setErrors] = useState([]);
  const { issues, setIssues } = useContext(IssuesContext);

  useEffect(() => {
    return () => {
      // Cleanup function
    };
  }, []); 

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      issue_id: issueId,
      content: commentContent,
      user_id: userId,
      username: user.username
    };

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((newComment) => {
            setErrors([]);
            const updatedIssues = issues.map((issue) => {
              if (issue.id === issueId) {
                issue.issues_with_comments.push(newComment);
              }
              return issue;
            });
            setIssues(updatedIssues);
            setUser((prevUser) => ({
              ...prevUser,
              issues: [...prevUser.issues, newComment.issue],
            }));
            setCommentContent("");
          });
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
          });
        }
      });    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Comment</h2>
      <div>
        <Label htmlFor="comment">Comment</Label>
        <Input
          type="text"
          id="comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </div>
      <FormField>
        {errors?.map((err, index) => (
          <Error key={index}>{err}</Error>
        ))}
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default NewComment;
