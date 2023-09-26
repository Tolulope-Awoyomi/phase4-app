import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { UserContext } from "../components/context/user";

function MyIssuesList() {
  const { user } = useContext(UserContext);

  return !user || !user.issues || user.issues.length === 0 ? (
    <Wrapper>
      <p>You have not commented on any issue.</p>
      <Button as={Link} to="/issues">
        View all issues
      </Button>
    </Wrapper>
  ) : (
    <Wrapper>
      {user.issues.map((issue) => (
        <Issue key={issue.id}>
          <Box>
            <Link to={`/issues/${issue.id}`}>
              <h2>{issue.title}</h2>
            </Link>
            <p>{issue.description}</p>
            <p>
              <em>
                <b>Category:</b> {issue.category}
              </em>
              &nbsp;·&nbsp;
            </p>
          </Box>
        </Issue>
      ))}
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

export default MyIssuesList;
