import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/";

const ChatPage = () => {
  const [conversation, setConversation] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");

  // Define a function to get the current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  const handleGenerateResponse = () => {
    fetch(`/chat/generate_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": `Generate a response to a student's debt issue`
      })
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((response) => {
            // Create a new message object
            const newMessage = {
              role: "bot", // Assuming the response is from the bot
              timestamp: getCurrentTime(),
              content: response.response,
            };
            // Add the new message to the conversation
            setConversation([...conversation, newMessage]);
          });
        } else {
          r.json().then((err) => console.log(err.errors));
        }
      });
  };

  return (
    <Wrapper>
      {conversation.map((message, index) => (
        <ChatMessage key={index} role={message.role}>
          <div>
            <small>{message.timestamp}</small>
          </div>
          {message.content}
        </ChatMessage>
      ))}
      <Button onClick={handleGenerateResponse}>Chat with StudebtGPT</Button>
      {generatedResponse && (
        <div>
          <h3>Generated Response:</h3>
          <p>{generatedResponse}</p>
        </div>
      )}
    </Wrapper>
  );
};

const ChatMessage = styled.div`
  background-color: ${(props) =>
    props.role === "user" ? "lightblue" : "lightgray"};
  padding: 8px;
  margin: 8px;
`;

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

export default ChatPage;
