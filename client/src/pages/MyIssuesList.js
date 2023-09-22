import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/context/user";
import { Button, Box, Input, Label } from "../styles";

function MyIssuesList({ issues, setIssues }) {
  const { user, setUser } = useContext(UserContext);
  const [issueBeingEdited, setIssueBeingEdited] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [errors, setErrors] = useState([]);

  if (!user || !user.issues) {
    return <p>Loading...</p>;
  }

  const myCommentedIssues = user.issues.filter((issue) =>
    issue.issues_with_comments.some((comment) => comment.username === user.username)
  );

  const toggleComment = (id) => {
    if (id === issueBeingEdited) {
      setIssueBeingEdited(null);
      setEditCommentId(null); // Clear edit state when canceling editing
      setNewComment(""); // Clear new comment input when canceling editing
    } else {
      setIssueBeingEdited(id);
    }
  };


  function handleDeleteComment(id) {
    fetch(`/comments/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          // Assuming you have issues state and setIssues function
          const updatedIssues = myCommentedIssues.map((issue) => {
            const updatedComments = issue.issues_with_comments.filter(
              (comment) => comment.comment_id !== parseInt(id)
            );
            return {
              ...issue,
              issues_with_comments: updatedComments,
            };
          });
          setIssues(updatedIssues);
          setUser({ ...user, issues: updatedIssues });
        }
      })
      .catch((error) => {
        // Clear existing errors before appending the new error message
        setErrors([error.message]);
      });
  }
  
  

  function handleEditComment(comment) {
    setNewComment(comment.content); // Set newComment to the comment content
    setEditCommentId(comment.comment_id); // Set the edit comment ID
  }

  function handleUpdateComment(comment) {
    const updatedComment = { content: newComment };
    fetch(`/comments/${comment.comment_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedComment),
    })
      .then((r) => {
        if (r.ok) {
          // Assuming you have issues state and setIssues function
          const updatedIssues = myCommentedIssues.map((issue) => {
            const updatedComments = issue.issues_with_comments.map((c) =>
              c.comment_id === comment.comment_id ? { ...c, ...updatedComment } : c
            );
            return {
              ...issue,
              issues_with_comments: updatedComments,
            };
          });

          setIssues(updatedIssues);
          setIssueBeingEdited(null);
          setEditCommentId(null); // Clear edit state after successful update
          setNewComment(""); // Clear new comment input after successful update
        }
      })
      .catch((error) => {
        setErrors([...errors, error.message]); // Append the error message to the errors array
      });
  }

  function handleCancelEdit() {
    setIssueBeingEdited(null);
    setEditCommentId(null); // Clear edit state when canceling editing
    setNewComment(""); // Clear new comment input when canceling editing
  }

  return (
    <div>
      <h2>My Commented Issues</h2>
      {myCommentedIssues.length === 0 ? (
        <p>You haven't commented on any issues yet.</p>
      ) : (
        myCommentedIssues.map((issue) => (
          <div key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <ul>
              {issue.issues_with_comments
                .filter((comment) => comment.username === user.username)
                .map((comment) => (
                  <Box key={comment.comment_id}>
                    {editCommentId === comment.comment_id ? (
                      <form onSubmit={() => handleUpdateComment(comment)}>
                        <Label htmlFor="comment">Edit Comment</Label>
                        <Input
                          type="text"
                          id="comment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button type="submit">Update</Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                      </form>
                    ) : (
                      <>
                        {comment.content}
                        <br />
                        <em>by: {comment.username}</em>
                        <br />
                        <Button onClick={() => handleEditComment(comment)}>Edit</Button>
                        <Button onClick={() => handleDeleteComment(comment.comment_id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </Box>
                ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MyIssuesList;
