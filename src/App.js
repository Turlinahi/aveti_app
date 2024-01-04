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
import Chunk from './Components/Chunk';
import Status from './Components/Status';
import Header from './Components/Header';
import { faGraduationCap, faBook, faCheckCircle, faPencilAlt, faWindowRestore,faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './App.css';

function App() {
  const [grades, setGrades] = useState([]);

  const handleAddGrade = (grade) => {
    setGrades([...grades, grade]);
  };

  const rMarginImageUrl = 'https://i.pinimg.com/564x/39/82/6e/39826eecfd29436ce177d506f61ec432.jpg';

  const handleAddBook = (book) => {
    console.log('Adding book:', book);
  };

  return (
    <div className={'App'}>
      <Router>
        <Header />

        <div className="container">
          
          <div className="right-menu">
            <div className="menu-container">
              <NavLink to="/grade" className="menu-item" title="Grade">
                <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                <span className="text">Grade</span>
              </NavLink>

              <NavLink to="/book" className="menu-item" title="Book">
                <FontAwesomeIcon icon={faBook} size="2x" />
                <span className="text">Book</span>
              </NavLink>
              <NavLink to="/topic" className="menu-item" title="Topic">
              <FontAwesomeIcon icon={ faWindowMaximize } size="2x" />
                <span className="text">Topic </span>
              </NavLink>
              <NavLink to="/subtopic" className="menu-item" title="Subtopic">
              <FontAwesomeIcon icon={ faWindowRestore  } size="2x" />
                <span className="text">Subtopic</span>
              </NavLink>
              <NavLink to="/chunk" className="menu-item" title="Chunk">
                <FontAwesomeIcon icon={faPencilAlt} size="2x" />
                <span className="text">Chunk</span>
              </NavLink>
              <NavLink to="/status" className="menu-item" title="Status">
              <FontAwesomeIcon icon={faCheckCircle} size="2x" />
                <span className="text">Status</span>
              </NavLink>
            </div>
          </div>

          <div className="content-menu">
            <Routes>
              <Route path="/add-grade" element={<AddGrade onAddGrade={(grade) => handleAddGrade(grade)} />} />
              <Route path="/book" element={<Book grades={grades} onAddBook={(book) => handleAddBook(book)} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/grade" element={<Grade />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/subtopic" element={<Subtopic />} />
              <Route path="/chunk" element={<Chunk />} />
              <Route path="/status" element={<Status />} />
            </Routes>
          </div>
            {/* Right margin image */}
         <img
            src={rMarginImageUrl}
            alt="Right Margin Image"
            className="right-margin-image"
          />
        </div>

      </Router>
      
    </div>
  );
}

export default App;
