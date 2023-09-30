import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";
import { UserContext } from "../components/context/user";
import { IssuesContext } from "../components/context/issues";

function NewIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { issues, setIssues } = useContext(IssuesContext);


  function handleAddIssue(newIssue) {
    setIssues([newIssue, ...issues])
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((issueFromForm) => {
            setErrors([]);
            handleAddIssue(issueFromForm);
            navigate("/issues");
          });

      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add an Issue</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Interest Rates">Interest Rates</option>
              <option value="Loan Forgiveness">Loan Forgiveness</option>
              <option value="Deferment">Deferment</option>
              <option value="Repayment Plans">Repayment Plans</option>
              <option value="Loan Types">Loan Types</option>
              <option value="Defaults">Defaults</option>
              <option value="Scams">Scams</option>
              <option value="Counselling">Counselling</option>
              <option value="Cost Reduction">Cost Reduction</option>
              <option value="Huge Student Debt">Huge Student Debt</option>
            </select>
          </FormField>

          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Issue"}
            </Button>
          </FormField>
          <FormField>
            {errors?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{title}</h1>
          <p>
            <em><b>Description:</b> {description} </em>
          </p>
          <p>
            <em><b>Category:</b> {category} </em>
          </p>
          <cite>By {user.username}</cite>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewIssue;
