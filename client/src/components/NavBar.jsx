import React from 'react';
import { NavLink } from 'react-router-dom';


export default function NavBar() {
  
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item" activeClassName="active" exact>
        Home
      </NavLink>
    
    </nav>
  )
}