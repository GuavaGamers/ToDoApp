
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isLoggedIn, handleLogout, loggedInUser }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand" style={{textDecoration: 'underline' }}>Home</Link>
      </div>
      <div className="navbar-center">
        {isLoggedIn && loggedInUser && (
          <span className="welcome-message">
            Hello, <span className="username">{loggedInUser.username}</span>! Ready to get things done?
          </span>
        )}
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/auth" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

