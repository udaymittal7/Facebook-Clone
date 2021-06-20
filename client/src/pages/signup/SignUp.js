import React from 'react';
import './signUp.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className='signUp'>
      <div className='signUp-wrapper'>
        <div className='signUp-left'>
          <h3 className='signUp-logo'>facebook</h3>
          <span className='signUp-desc'>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <form className='signUp-right'>
          <div className='signUp-box'>
            <input placeholder='First Name' required className='signUp-input' />
            <input placeholder='Surname' required className='signUp-input' />
            <input
              placeholder='Email'
              required
              type='email'
              className='signUp-input'
            />
            <input
              placeholder='New Password'
              type='password'
              required
              minLength='8'
              className='signUp-input'
            />
            <input
              placeholder='Date of birth'
              type='date'
              required
              minLength='8'
              className='signUp-input'
            />
            <input
              placeholder='Gender'
              type='text'
              required
              minLength='8'
              className='signUp-input'
            />
            <button className='signUp-button' type='submit'>
              Sign Up
            </button>
            <span className='signUp-forgot'>Forgot Password?</span>
            <Link
              to='/signUp'
              className='signUp-register-button'
              style={{ textDecoration: 'none' }}
            >
              <span className='signUp-register-button'>Sign in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
