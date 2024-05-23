// App.js
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import User from './components/User';
import Notes from './components/Notes';
import Todo from './components/Todo';

import './App.css';
import AuthPage from './components/auth/AuthPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await axios.get('/api/users');
        const users = result.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
        console.log('Could not get users :(');
      }
    };
    getUsers();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <HomePage /> : <Login handleLogin={handleLogin} />
          }
        />
        <Route
          path="/auth"
          element={
            <AuthPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path="/users" element={<User users={users} />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/todos" element={<Todo />} />
      </Routes>
      {!isLoggedIn && <Link to="/login">Login</Link>}
    </BrowserRouter>
  );
}

export default App;
