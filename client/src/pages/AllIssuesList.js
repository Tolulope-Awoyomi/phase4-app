import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles/";
import { IssuesContext } from "../components/context/issues";
import Filter from "../components/Filter";

function AllIssuesList() {
  const { issues, loading } = useContext(IssuesContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  if (loading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  const filteredByCategory = selectedCategory === "All" ? issues : issues.filter((issue) => issue.category === selectedCategory);

  const filteredIssues = searchQuery
    ? filteredByCategory.filter((issue) =>
        issue.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByCategory;

  return (
    <Wrapper>
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <SearchInput
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={handleSearch}
      />
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

const SearchInput = styled.input`
  width: 90%;
  margin-bottom: 16px;
  padding: 6px;
`;

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

const Issue = styled.article`
  margin-bottom: 24px;
`;

export default AllIssuesList;
