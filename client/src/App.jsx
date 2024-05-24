import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import User from './components/User';
import Notes from './components/Notes';
import Todo from './components/Todo';
import AuthPage from './components/auth/AuthPage';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    console.log('user passed into main app: ', user);
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      {isLoggedIn && (
        <NavBar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          loggedInUser={loggedInUser}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <HomePage />
            ) : (
              <AuthPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
            )
          }
        />
        <Route path="/users" element={<User users={users} />} />
        <Route path="/notes" element={<Notes loggedInUser={loggedInUser} />} />
        <Route path="/todos" element={<Todo loggedInUser={loggedInUser} />} />
      </Routes>
    </>
  );
}

export default App;
