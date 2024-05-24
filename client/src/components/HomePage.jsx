
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage">
      <Link to="/todos" className="card todos">
        <h2>To Dos</h2>
      </Link>
      <Link to="/notes" className="card notes">
        <h2>Notes</h2>
      </Link>
    </div>
  );
}

export default HomePage;
