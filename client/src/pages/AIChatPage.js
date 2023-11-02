import React, { useState } from "react";
import styled from "styled-components";
import { Button, Error, FormField } from "../styles/";

const ChatPage = () => {
  const [conversation, setConversation] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [errors, setErrors] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  const handleGenerateResponse = () => {
    if (!searchQuery.trim()) { 
      setErrors(["Message can't be blank"]);
      return;
    }
    
    setIsLoading(true); 

    fetch(`/chat/generate_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": searchQuery 
      })
    })
      .then((r) => {
        setIsLoading(false); 
        if (r.ok) {
          r.json().then((response) => {
            setErrors([])
            const userMessage = {
              role: "user",
              timestamp: getCurrentTime(),
              content: searchQuery,
            };
  
            const botResponse = {
              role: "bot",
              timestamp: getCurrentTime(),
              content: response.response.content,
            };
  
            setConversation([...conversation, userMessage, botResponse]);
  
            setSearchQuery("");
          });
        } else {
          r.json().then((err) =>setErrors(err.errors));
        }
      });
  };

  return (
    <Wrapper>
       <Header>ASK StudebtGPT your questions!</Header>  
      {isLoading && <div>Loading...</div>} 
      {conversation.map((message, index) => (
        <ChatMessage key={index} role={message.role}>
          <div>
            <small>{message.timestamp}</small>
          </div>
          {typeof message.content === 'string' ? (
            message.content
          ) : (
            JSON.stringify(message.content) 
          )}
        </ChatMessage>
      ))}
      <Input
        type="text"
        placeholder="Type your query..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleGenerateResponse}>Send</Button>

      <FormField>
            {errors?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
    </Wrapper>
  );
};

const ChatMessage = styled.div`
  background-color: ${(props) =>
    props.role === "user" ? "lightblue" : "lightgray"};
  padding: 8px;
  margin: 8px;
  color: ${(props) =>
    props.role === "user" ? "black" : "black"};
`;


const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
`;

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

const Header = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

export default ChatPage;
