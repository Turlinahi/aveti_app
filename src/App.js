import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Grade from './Components/Grade';
import Book from './Components/Book';
import Topic from './Components/Topic';
import Subtopic from './Components/Subtopic';
import AddGrade from './Components/AddGrade';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <div className="header-buttons">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/">Home</NavLink>
          </div>
        </div>

        <div className="container">
          <div className="left-menu">
            <div className="menu-container">
              <NavLink to="/grade" className='menu-item'>Grade</NavLink>
              <NavLink to="/book" className='menu-item'>Book</NavLink>
              <NavLink to="/topic" className='menu-item'>Topic</NavLink>
              <NavLink to="/subtopic" className='menu-item'>Subtopic</NavLink>
            </div>
          </div>

          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/grade" element={<Grade />} />
              <Route path="/book" element={<Book />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/subtopic" element={<Subtopic />} />
              <Route path="/add-grade" element={<AddGrade onAddGrade={(grade) => { /* handle adding grade */ }} />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
