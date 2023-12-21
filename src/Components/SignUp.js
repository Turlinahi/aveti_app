import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Store/UserSlice';

export const SignUp = () => {
  // States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Redux state
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUpEvent = async (e) => {
    e.preventDefault();

    // User credentials object
    const userCredentials = {
      email,
      username,
      password,
    };

    try {
      // Dispatch the registerUser action and wait for the result
      const result = await dispatch(loginUser(userCredentials));

      // Check if the registration was successful
      if (result.payload) {
        // Clear input fields
        setEmail('');
        setUsername('');
        setPassword('');

        // Navigate to the home page or the login page
        navigate('/');
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Registration failed:', error);
    }
  };

  return (
    <form className='form-group custom-form' onSubmit={handleSignUpEvent}>
      {/* custom-form is a custom class */}
      <label>Email</label>
      <input
        type='email'
        required
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label>Username</label>
      <input
        type='text'
        required
        className='form-control'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
        {loading ? 'Loading...' : 'Sign Up'}
      </button>

      {error && <div className='alert alert-danger' role='alert'>{error}</div>}

      {/* "Already have an account? Login" text and link */}
      <p>
        Already have an account?{' '}
        <a href="/login" className='login-link'>
          Login
        </a>
      </p>
    </form>
  );
};

export default SignUp;
