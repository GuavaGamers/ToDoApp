import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const SignUp = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
      username,
    };

    try {
      const response = await axios.post('/api/auth/signup', body);
      console.log('signup successful', response.data);
      // login after sign up is successful
      handleLogin(response.data);
      navigate('/');
    } catch (error) {
      console.error('signup failed', error);
    }
  };

  return (
    <div className="login-signup-container">
      <h2>Sign Up</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="form-label">Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form-label">Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form-label">Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
