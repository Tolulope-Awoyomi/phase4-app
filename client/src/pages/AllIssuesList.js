import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles/";
import { IssuesContext } from "../components/context/issues";
import Filter from "../components/Filter";

function AllIssuesList() {
  const { issues, loading } = useContext(IssuesContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  if (loading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  // Filter issues based on selected category
  const filteredIssues = selectedCategory === 'All' ? issues : issues.filter(issue => issue.category === selectedCategory);

  return (
    <Wrapper>
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      {filteredIssues.length > 0 ? (
        filteredIssues.map((issue) => (
          <Issue key={issue.id}>
            <Box>
              <h2>{issue.title}</h2>
              <p>{issue.description}</p>
              <p>
                <em>
                  <b>Category:</b> {issue.category}
                </em>
                &nbsp;·&nbsp;
              </p>
              <Link to={`/issues/${issue.id}`}>Comments</Link>
            </Box>
          </Issue>
        ))
      ) : (
        <>
          <h2>No Issues Found</h2>
          <Button as={Link} to="/new-issue">
            Add a New Issue
          </Button>
        </>
      )}
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

export default AllIssuesList;
