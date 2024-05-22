
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
