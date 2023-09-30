import styled from "styled-components";

const Box = styled.div`
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  padding: 16px;
  background: linear-gradient(45deg, #2196F3, #81C784); /* Soft Blue to Calming Green */
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.2),
      0 0 0 1px rgba(10, 10, 10, 0.05);
  }
`;

export default Box;
