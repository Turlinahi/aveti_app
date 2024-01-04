import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginEvent = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    try {
      const result = await dispatch(loginUser(userCredentials));

      if (result.payload && 'accessToken' in result.payload) {
        setEmail('');
        setPassword('');

        swal("Success", result.payload.message, "success", {
          buttons: false,
          timer: 2000,
        }).then(() => {
          localStorage.setItem('accessToken', result.payload['accessToken']);
          localStorage.setItem('user', JSON.stringify(result.payload['user']));
          navigate('/profile');
        });
      } else {
        // Show a more user-friendly error message
        swal("Failed", result.payload.message || 'Incorrect email or password', "error");
      }
    } catch (error) {
      // Log the detailed error for yourself
      console.error('Login failed:', error);
      // Show a generic error message to the user
      swal("Failed", "An error occurred. Please try again later.", "error");
    }
  };

  return (
    <form className='form-group custom-form' onSubmit={handleLoginEvent}>
      <label>Email</label>
      <input
        type='email'
        required
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <button type='submit' className={`btn btn-success btn-md ${loading ? 'disabled' : ''}`} disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>

      {error && <div className='alert alert-danger' role='alert'>{error}</div>}

      <p>
      Don&apos;t have an account?{' '}

        <NavLink to="/signup" className='signup-link'>
          Sign Up
        </NavLink>
      </p>
    </form>
  );
};

export default Login;