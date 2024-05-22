
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>To-Do App Homepage</h1>
      <ul>
        <li><Link to="/todos">To-Do List</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
    </div>
  );
}

export default HomePage;