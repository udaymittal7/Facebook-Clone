import React, { useEffect, useState } from 'react';
import './signIn.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login, clearError } from '../../redux/actions/authAction';

const SignIn = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const state = useSelector((state) => state.auth);
  const { email, password } = user;
  const { isAuthenticated, error } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Facebook / log in or sign up';
    if (isAuthenticated === true) {
      props.history.push('/');
    }

    if (error) {
      dispatch(clearError());
    }
  }, [isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  return (
    <div className='signIn'>
      <div className='signIn-wrapper'>
        <div className='signIn-left'>
          <h3 className='signIn-logo'>facebook</h3>
          <span className='signIn-desc'>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <form className='signIn-right' onSubmit={onSubmit}>
          <div className='signIn-box'>
            <input
              placeholder='Email'
              required
              name='email'
              value={email}
              onChange={onChange}
              type='email'
              className='signIn-input'
            />
            <input
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              minLength='8'
              className='signIn-input'
            />
            <button className='signIn-button' type='submit'>
              Sign In
            </button>
            <span className='signIn-forgot'>Forgotten Password?</span>
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
