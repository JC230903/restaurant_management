// Import App.css without renaming it
import './App.css';
import Home from './screens/Home';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screens/Signup';
import { CartProvider } from './components/Contextreducer';
import Myorder from './screens/Myorder';


// Rename the function component to avoid conflict
function MyApp() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            {/* Update the path for Signup */}
            <Route exact path="/Signup" element={<Signup />} />
            {/* Add the correct path for Myorder */}
            <Route exact path="/myorder" element={<Myorder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default MyApp;
