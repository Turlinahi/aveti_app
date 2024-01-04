// components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://avetilearning.com/wp-content/uploads/2022/09/aveti-logo-icon-black.png"
        alt="Aveti Logo"
        className="logo"
      />
      <img
        src="https://i.pinimg.com/originals/d2/97/9f/d2979f5c6d717bfce3b4828afae6f8c7.gif"
        alt="Aveti Logo"
        className="logo"
      />

      <NavLink to="/home" className="nav-link">
        <button>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='text'>Home</span>
          </button>
      </NavLink>
      <NavLink to="/login" className="nav-link">
        <button>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='text'>Login</span>
        </button>
      </NavLink>
      <NavLink to="/signup" className="nav-link">
        <button>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='circle1'></span>
          <span className='text'>SignUp</span>
        </button>
      </NavLink>
    </div>
  );
};

export default Header;
