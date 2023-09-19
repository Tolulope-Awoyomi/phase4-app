import { Link } from "react-router-dom";
import styled from "../styles/";
import { Box, Button } from "../styles";

function AllIssuesList({issues}){

    return (
        <Wrapper>
            {issues.length > 0 ? (
                issues.map((issue) => (
                    
                        <Box key={issue.id}>
                        <img className="poster" alt={issue.title}src={issue.title}/>
                        <h2>{issue.title}</h2>
                        <h4>{issue.description}</h4>
                        <p>
                            <em><b>Category:</b> {issue.category}</em>
                            &nbsp;·&nbsp;
                        </p>
                        <Link to={`/issues/${issue.id}`}>Comments</Link>
                        </Box>
                   
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

const Movie = styled.article`
  margin-bottom: 24px;
`;

export default AllIssuesList;