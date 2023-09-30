import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./components/context/user";
import { IssuesProvider } from './components/context/issues';
import { createGlobalStyle } from "styled-components";
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`
  *,
  *::before, 
  *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
  }

  body {
    font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  }
`;


ReactDOM.render(
  <Router>
    <IssuesProvider>
      <UserProvider> 
        <App />
      </UserProvider>
    </IssuesProvider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
