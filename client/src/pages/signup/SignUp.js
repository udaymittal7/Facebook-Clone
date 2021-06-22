import React, { useEffect, useState } from 'react';
import './signUp.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signup } from '../../redux/actions/authAction';

const SignIn = (props) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    gender: '',
  });

  const state = useSelector((state) => state.auth);
  const { isAuthenticated } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Facebook - log in or sign up';

    if (isAuthenticated === true) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ ...user }));
  };

  return (
    <div className='signUp'>
      <div className='signUp-wrapper'>
        <div className='signUp-left'>
          <h3 className='signUp-logo'>facebook</h3>
          <span className='signUp-desc'>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <form className='signUp-right' onSubmit={onSubmit}>
          <div className='signUp-box'>
            <input
              placeholder='First Name'
              required
              name='firstName'
              className='signUp-input'
              value={user.firstName}
              onChange={onChange}
            />
            <input
              placeholder='Surname'
              required
              name='lastName'
              className='signUp-input'
              value={user.lastName}
              onChange={onChange}
            />
            <input
              placeholder='Email'
              required
              name='email'
              type='email'
              className='signUp-input'
              value={user.email}
              onChange={onChange}
            />
            <input
              placeholder='New Password'
              type='password'
              required
              name='password'
              minLength='8'
              className='signUp-input'
              value={user.password}
              onChange={onChange}
            />
            <input
              placeholder='Date of birth'
              type='date'
              required
              name='dob'
              minLength='8'
              className='signUp-input'
              value={user.dob}
              onChange={onChange}
            />
            <input
              placeholder='Gender'
              type='text'
              required
              name='gender'
              className='signUp-input'
              value={user.gender}
              onChange={onChange}
            />
            <button className='signUp-button' type='submit'>
              Sign Up
            </button>
            <span className='signUp-forgot'>Forgotten Password?</span>
            <Link
              to='/signin'
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
