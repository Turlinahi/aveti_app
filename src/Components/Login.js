import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const Login = () => {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux state
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginEvent = async (e) => {
    e.preventDefault();

    // User credentials object
    const userCredentials = {
      email,
      password,
    };

    try {
      // Dispatch the loginUser action and wait for the result
      const result = await dispatch(loginUser(userCredentials));

      // Check if the login was successful
      if (result.payload && 'accessToken' in result.payload) {
        // Clear input fields
        setEmail('');
        setPassword('');

        // Show success message using swal
        swal("Success", result.payload.message, "success", {
          buttons: false,
          timer: 2000,
        }).then(() => {
          // Store the access token and user details in localStorage
          localStorage.setItem('accessToken', result.payload['accessToken']);
          localStorage.setItem('user', JSON.stringify(result.payload['user']));

          // Navigate to the profile page
          navigate('/profile');
        });
      } else {
        // If login fails, show an error message
        swal("Failed", result.payload.message || 'Login failed', "error");
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Login failed:', error);
    }
  }; 

  return (
    <form className='form-group custom-form' onSubmit={handleLoginEvent}>
      {/* custom-form is a custom class */}
      <label>Email</label>
      <input
        type='email'
        required
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* update the 'email' state */}
      <br />
      <label>Password</label>
      <input
        type='password'
        required
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type='submit' className='btn btn-success btn-md'>
        {loading ? 'Loading...' : 'Login'}
      </button>

      {error && <div className='alert alert-danger' role='alert'>{error}</div>}

      {/* "Don't have an account? Sign Up" text and link */}
      <p>
        Don't have an account?{' '}
        <a href="/signup" className='signup-link'>
          Sign Up
        </a>
      </p>
      
    </form>
  );
};

export default Login;