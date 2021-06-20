import React from 'react';
import './signIn.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className='signIn'>
      <div className='signIn-wrapper'>
        <div className='signIn-left'>
          <h3 className='signIn-logo'>facebook</h3>
          <span className='signIn-desc'>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <form className='signIn-right'>
          <div className='signIn-box'>
            <input
              placeholder='Email'
              required
              type='email'
              className='signIn-input'
            />
            <input
              placeholder='Password'
              type='password'
              required
              minLength='8'
              className='signIn-input'
            />
            <button className='signIn-button' type='submit'>
              Sign In
            </button>
            <span className='signIn-forgot'>Forgot Password?</span>
            <Link
              to='/signup'
              className='signIn-register-button'
              style={{ textDecoration: 'none' }}
            >
              <span className='signIn-register-button'>
                Create a New Account
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
