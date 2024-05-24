// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css'; 

// function NavBar({ isLoggedIn, handleLogout, loggedInUser }) {
//   return (
//     <nav>
//       <Link to="/">Home</Link>

//       {isLoggedIn && loggedInUser && <span>Hello, <span style={{ color: 'red' }}>{loggedInUser.username}</span>! Ready to get things done?</span>} 
//       {isLoggedIn ? (
//         <button onClick={handleLogout}>Logout</button>
//       ) : (
//         <Link to="/auth">Login</Link>
//       )}
//     </nav>
//   );
// }

// export default NavBar;


import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar({ isLoggedIn, handleLogout, loggedInUser }) {
  return (
    <nav>
      <Link to="/" style={{ fontWeight: 'bold', color: "#5faacc", textDecoration: 'underline' }}>Home</Link>

      {isLoggedIn && loggedInUser && <span>Hello, <span style={{ color: 'red' }}>{loggedInUser.username}</span> ! Ready to get things done?</span>} 
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </nav>
  );
}

export default NavBar;

