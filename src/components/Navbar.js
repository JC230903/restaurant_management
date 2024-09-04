import React, { useState } from "react";  // Remove the extra import of useState
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from '../components/Contextreducer.js';

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);  // Fixed typo in variable name
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          {/* ... rest of the code ... */}
          <div className="d-flex">
            <Link className="btn bg-white text-success mx-1" to="/login">
              Login
            </Link>
            <Link className="btn bg-white text-success mx-1" to="/createuser">
              SignUp
            </Link>
          </div>
          {/* ... rest of the code ... */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
