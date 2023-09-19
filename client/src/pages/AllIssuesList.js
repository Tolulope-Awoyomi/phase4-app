import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles/";
import { UserContext } from "../components/context/user";

function AllIssuesList(){
  const [issues, setIssues] = useState([]);
  const { user, login } = useContext(UserContext)


  useEffect(() => {
    fetch("/issues")
    .then((r) => r.json())
    .then(setIssues);
  }, [])

    return (
        <Wrapper>
            {issues.length > 0 ? (
                issues.map((issue) => (
                    <Issue key={issue.id}>
                        <Box>
                        <img className="poster" alt={issue.title}src={issue.title}/>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                        <p>
                            <em><b>Category:</b> {issue.category}</em>
                            &nbsp;·&nbsp;
                            <cite>By {issue.user.username} </cite>
                        </p>
                        <Link to={`/issues/${issue.id}`}>Comments</Link>
                        </Box>
                    </Issue>
                ))
            ) : (
                <>
                    <h2>No Issues Found</h2>
                    <Button as={Link} to="/new">
                        Add a New Issue
                    </Button>
                </>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

const Issue = styled.article`
  margin-bottom: 24px;
`;

export default AllIssuesList;