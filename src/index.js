import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import authReducer from './reducers/auth';
import currentUserReducer from './reducers/currentUser';
import questionsReducer from './reducers/questions.js';
import userReducer from './reducers/users';


const store= configureStore({ 
  reducer: {
  auth: authReducer,
  currentUser: currentUserReducer,
  questionReducer: questionsReducer,
  userReducer: userReducer,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);




