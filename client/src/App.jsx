
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import User from './components/User';

import './App.css';

function App() {
  
  const [users, setUsers] = useState([])
   
  useEffect(() => {
      
      const getUsers = async () => {
          try {
              const result = await axios.get('/api/users')
              const users = result.data
              //update our state to save these apprentices to our component -
              setUsers(users)
          } catch (error) {
              console.error(error)
              console.log("Could not get users :(")
          }
      }
      //invoke the method
      getUsers()
  }, [])

  //console.log(users)
  
  
  
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<User users={users} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
