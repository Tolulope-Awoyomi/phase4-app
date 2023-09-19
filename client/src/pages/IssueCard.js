import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Box } from "../styles";
import NewIssue from "./NewIssue";
import NewComment from "./NewComment";
import { Button, Input, Label } from "../styles";
import { UserContext } from "../components/context/user";

function IssueCard({ issues, setIssues }) {
  const { id } = useParams();
  const [issue, setIssue] = useState({});
  const [newComment, setNewComment] = useState("");
  const [toggleNewComment, setToggleNewComment] = useState(false);
  const [status, setStatus] = useState("pending");
  const { user, login, setUser } = useContext(UserContext);
  const foundIssue = issues.find((issue) => issue.id === parseInt(id));

  useEffect(() => {
    if (foundIssue) {
      setIssue(foundIssue);
      setStatus("found");
    } else {
      setStatus("rejected");
    }
  }, [id, issues, foundIssue]);

  function handleAddComment(updatedComments) {
    foundIssue.issues_with_comments = updatedComments;
    setIssue({ ...foundIssue });
    const newIssues = issues.map((issue) => {
      if (foundIssue.id === issue.id) {
        return foundIssue;
      } else {
        return issue;
      }
    });
    setIssues(newIssues);
  }

  function handleDelete(id) {
    fetch(`/comments/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        const filteredComment = issue.issues_with_comments.filter((comment) => {
          return comment.comment_id !== id;
        });
        foundIssue.issues_with_comments = filteredComment;
        setIssue({ ...foundIssue });
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

  function handleUpdateComment(e, id) {
    e.preventDefault();
    const addComment = { content: newComment };
    fetch(`/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addComment),
    })
      .then((r) => r.json())
      .then((data) => {
        const individualComment = {
          comment_id: data.id,
          content: data.content,
          username: data.user.username,
        };
        const updatedComments = foundIssue.issues_with_comments.map((comment) =>
          comment.comment_id === individualComment.comment_id
            ? individualComment
            : comment
        );
        foundIssue.issues_with_comments = updatedComments;
        setIssue({ ...foundIssue });
        const newIssues = issues.map((issue) => {
          if (foundIssue.id === issue.id) {
            return foundIssue;
          } else {
            return issue;
          }
        });

        setIssues(newIssues);
        setToggleNewComment(false);
      });
  }

  function hasUserCommented(param1) {
    let result = false;
    param1.issues_with_comments.forEach((issue) => {
      if (issue.username === user.username) {
        result = true;
      }
    });
    return result;
  }

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: Issue doesn't exist</h2>;

  return (
    <Wrapper>
      <Box>
        <h1>Title: {issue.title}</h1>
        <h3>Issue: {issue.description}</h3>
        <h5>Category: {issue.category}</h5>
      </Box>
      <Box>
        {hasUserCommented(foundIssue) ? null : (
          <NewComment
            handleAddComment={handleAddComment}
            issueId={issue.id}
            userId={user.id}
            user={user}
            setUser={setUser}
            issues={issues}
          ></NewComment>
        )}

        {issue.issues_with_comments?.map((comment) => (
          <Box key={comment.comment_id}>
            {comment.content}
            <br></br>
            <br></br>
            by: <em>{comment.username}</em>
            <br></br>
            {comment.username === user.username ? (
              <>
                <button onClick={() => handleDelete(comment.comment_id)}>
                  Delete
                </button>
                <button
                  onClick={() => setToggleNewComment((toggle) => !toggle)}
                >
                  Edit your Comment
                </button>
                {toggleNewComment ? (
                  <form>
                    <Label htmlFor="title">Comment</Label>
                    <Input
                      type="text"
                      id="comment"
                      value={issue.content}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      onClick={(e) => handleUpdateComment(e, comment.comment_id)}
                      color="primary"
                      type="submit"
                    >
                      Submit Comment
                    </Button>
                  </form>
                ) : null}
              </>
            ) : null}
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
