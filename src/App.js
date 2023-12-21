// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Grade from './Components/Grade';
import Book from './Components/Book';
import Topic from './Components/Topic';
import Subtopic from './Components/Subtopic';
import AddGrade from './Components/AddGrade';
import Chunk from './Components/Chunk'
import Status from './Components/Status';
import './App.css';

function App() {
  const [grades, setGrades] = useState([]);

  // Function to handle adding grade
  const handleAddGrade = (grade) => {
    setGrades([...grades, grade]);
  };

  // Function to handle adding book
  const handleAddBook = (book) => {
    console.log('Adding book:', book);
    // Implement logic to add a book
  };

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
              <NavLink to="/chunk" className='menu-item'>Chunk</NavLink>
              <NavLink to="/status" className='menu-item'>Status</NavLink>
            </div>
          </div>

          <div className="content">
            <Routes>
              <Route
                path="/add-grade"
                element={<AddGrade onAddGrade={(grade) => handleAddGrade(grade)} />}
              />
              <Route
                path="/book"
                element={<Book grades={grades} onAddBook={(book) => handleAddBook(book)} />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/grade" element={<Grade />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/subtopic" element={<Subtopic />} />
              <Route path="/chunk" element={<Chunk/>} />
              <Route path="/status" element={<Status />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
