import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, handleLogout, loggedInUser }) {
  return (
    <nav>
      <Link to="/">Home</Link>

      {isLoggedIn && loggedInUser && <span>Hello, {loggedInUser.username}! Ready to get things done?</span>} 
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </nav>
  );
}

export default NavBar;
