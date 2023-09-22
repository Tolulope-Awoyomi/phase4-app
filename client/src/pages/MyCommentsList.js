import styled from "styled-components";
import { Box, Button, Input, Label } from "../styles";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../components/context/user";

function MyCommentsList({issues, setIssues}) {
  const [newComment, setNewComment] = useState("")
  const [issueBeingEdited, setIssueBeingEdited] = useState(null)
  const { user } = useContext(UserContext);
 
  const toggleComment = (id) => {
    if(id === issueBeingEdited) { 
      setIssueBeingEdited(null)
    } else { 
      setIssueBeingEdited(id)
    }
  }
  useEffect(() => {
    console.log("newComment:", newComment);
    console.log("issueBeingEdited:", issueBeingEdited);
  }, [newComment, issueBeingEdited]);
  

  function handleDeleteComment (id) {
    fetch(`/comments/${id}`, {
      method: 'DELETE'
    })
    .then(r => {
      if (r.ok) {
        const foundIssue = issues.find((issue) => {
          if (issue.issues_with_comments) {
            const commentsArray = issue.issues_with_comments;
            const foundComment = commentsArray.find((comment) => comment.issue_id === parseInt(id));
            if (foundComment) {
              return foundComment;
            }
          }
          return false;
        });
        
        const filteredComment = foundIssue.issues_with_comments.filter((comment) => {
          return comment.comment_id !== parseInt(id)
        })
        foundIssue.issues_with_comments = filteredComment
        const newIssues = issues.map(issue => {
          if (foundIssue.id === issue.id){
            return foundIssue
          } else {
            return issue
          }
        })
        setIssues(newIssues)
      }
    })
  }

  function handleUpdateComment (e, id) {
    e.preventDefault()
    const addComment = {
      content: newComment,
    }
    fetch(`/comments/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(addComment),
    })
     .then(r => {
      if (r.ok) {
      r.json().then(data => {
        const individualComment = {
          comment_id: data.id,
          content: data.content,
          username: data.user.username,
        }

        const foundIssue = issues.find((issue) => {
          const commentsArray = issue.issues_with_comments
          const foundComment = commentsArray.find((comment) => comment.comment_id === parseInt(id))
           if(foundComment){
            return true
           } else {
            return false
           }
        })
        const updatedComments = foundIssue.issues_with_comments.map((comment) => comment.comment_id === individualComment.comment_id ? individualComment : comment)
        foundIssue.issues_with_comments = updatedComments
        const newIssues = issues.map(issue => {
          if (foundIssue.id === issue.id){
            return foundIssue
          } else {
            return issue
          }
        })
        console.log("NEW ISSUES pre setIssues:", newIssues)
        setIssues(newIssues)
        console.log("NEW ISSUES POST setIssues:", newIssues)


        setIssueBeingEdited(null)

      })
      
      }
      
     })
  }

  return (
    <Wrapper>
      {issues.map((issue) => issue.issues_with_comments.map((comment) => {
    if (comment.username === user.username) {
      return (
        <Issue key={issue.id}>
        <Box>
          <h1>{issue.title}</h1>
          <p>
            <em><b>Description:</b> {issue.description}</em>
            &nbsp;·&nbsp;
            <cite><b>Category:</b> {issue.category}</cite><br></br><br></br>
            &nbsp;·&nbsp;
          </p>
          <p><em><b>My comment:</b></em> {comment.content}</p>
          <button onClick={() => handleDeleteComment(comment.comment_id)}>Delete</button>
          <button onClick={() => toggleComment(comment.id)}>Edit</button>
          {issueBeingEdited === issue.id ? 
                            <form>
                            <Label htmlFor="title">Comment</Label>
                            <Input
                              type="text"
                              id="comment"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                                <Button onClick={(e) => handleUpdateComment(e, comment.comment_id)} color="primary" type="submit">
                                 Submit Comment
                                </Button>
                            </form>
                              : null
                        }  
        </Box>
        </Issue>
      )
    }
  }))}
  
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

const Issue = styled.article`
  margin-bottom: 24px;
`;

export default MyCommentsList;
