// Import necessary dependencies from React
import React from 'react';
import ReactDOM from 'react-dom';

// Import your CartProvider from the correct path
import { CartProvider } from './components/Contextreducer.js';

// Import your styles and App component
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root and render the App component wrapped in CartProvider
const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

