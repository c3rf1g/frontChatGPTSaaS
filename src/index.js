import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
export const API_DOMAIN = 'http://localhost:3000';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


