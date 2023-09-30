import styled from "styled-components";

const FormField = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  text-align: center; /* Center text horizontally */
  color: var(--secondary); /* Use the secondary color (Warm Gray) for text */
`;

export default FormField;
