import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Box } from "../styles";
import NewComment from "./NewComment";
import { Button, Input, Label } from "../styles";
import { UserContext } from "../components/context/user";
import { IssuesContext } from "../components/context/issues";

function IssueCard() {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [status, setStatus] = useState("pending");
  const { user, setUser } = useContext(UserContext); 
  const { issues, setIssues } = useContext(IssuesContext);

  const foundIssue = Array.isArray(issues)
  ? issues.find((issue) => issue.id === parseInt(id))
  : null;


  useEffect(() => {
    if (foundIssue) {
      setStatus("found");
    } else {
      setStatus("rejected");
    }
  }, [id, issues, foundIssue]);


  function handleAddComment(updatedComments) {
    const updatedIssue = { ...foundIssue };
    updatedIssue.issues_with_comments = updatedComments;
  
    const newIssues = issues.map((issue) =>
      issue.id === updatedIssue.id ? updatedIssue : issue
    );
  
    setIssues(newIssues);
  }
  

  function handleDelete(id) {
    fetch(`/comments/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        const filteredComments = foundIssue.issues_with_comments.filter(
          (comment) => {
            return comment.comment_id !== id;
          }
        );
        foundIssue.issues_with_comments = filteredComments;
        const newIssues = issues.map((issue) => {
          if (foundIssue.id === issue.id) {
            return foundIssue;
          } else {
            return issue;
          }
        });
        const userUpdatedIssues = user.issues.filter(
          (issue) => foundIssue.id !== issue.id
        );
        setIssues(newIssues);
        setUser({ ...user, issues: userUpdatedIssues });
      }
    });
  }

  function handleEditComment(commentId) {
    setEditCommentId(commentId);
    const editedComment = foundIssue.issues_with_comments.find(
      (comment) => comment.comment_id === commentId
    );
    setNewComment(editedComment.content);
  }

  function handleCancelEdit() {
    setEditCommentId(null);
    setNewComment("");
  }

  function handleUpdateComment(e, commentId) {
    e.preventDefault();
    const updatedComment = {
      content: newComment,
    };
    fetch(`/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedComment),
    })
      .then((r) => r.json())
      .then((data) => {
        const updatedCommentWithUsername = {
          comment_id: data.id,
          content: data.content,
          username: data.user.username,
        };
        const updatedComments = foundIssue.issues_with_comments.map((comment) =>
          comment.comment_id === updatedCommentWithUsername.comment_id
            ? updatedCommentWithUsername
            : comment
        );
        foundIssue.issues_with_comments = updatedComments;
        setEditCommentId(null);
        setNewComment("");
      });
  }

  function hasUserCommented(param1) {
    if (param1 && param1.issues_with_comments) {
      return param1.issues_with_comments.some(
        (issue) => issue.username === user.username
      );
    }
    return false;
  }
  

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: Issue doesn't exist</h2>;

  return (
    <Wrapper>
      <Box>
        <h1>Title: {foundIssue.title}</h1>
        <h3>Issue: {foundIssue.description}</h3>
        <h5>Category: {foundIssue.category}</h5>
      </Box>
      <Box>
        {hasUserCommented(foundIssue) ? null : (
          <NewComment
            handleAddComment={handleAddComment}
            issueId={foundIssue.id}
            userId={user.id}
            user={user}
            setUser={setUser}
            issues={issues}
          />
        )}

        {foundIssue.issues_with_comments?.map((comment) => (
          <Box key={comment.comment_id}>
            {editCommentId === comment.comment_id ? (
              <form onSubmit={(e) => handleUpdateComment(e, comment.comment_id)}>
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
                <br></br>
                <br></br>
                by: <em>{comment.username}</em>
                <br></br>
                {comment.username === user.username ? (
                  <>
                    <Button onClick={() => handleDelete(comment.comment_id)}>
                      Delete
                    </Button>
                    <Button onClick={() => handleEditComment(comment.comment_id)}>
                      Edit
                    </Button>
                  </>
                ) : null}
              </>
            )}
          </Box>
        ))}
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

export default IssueCard;
