import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const { auth, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Coffee Shop</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        
        <li>
          <Link to="/cart" className="navbar-link">Cart</Link>
        </li>
        {!auth ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
