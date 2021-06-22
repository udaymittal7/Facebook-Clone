import React, { useEffect, useState } from 'react';
import './resetPassword.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetPassword, clearError } from '../../redux/actions/authAction';

const ResetPassword = (props) => {
  const [data, setData] = useState({
    url: window.location.pathname,
    password: '',
  });

  const { password } = data;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(data));
  };

  const state = useSelector((state) => state.auth);
  const { isAuthenticated, error } = state;

  useEffect(() => {
    document.title = 'Facebook / log in or sign up';
    if (isAuthenticated === true) {
      props.history.push('/');
    }

    if (error) {
      dispatch(clearError());
    }
  }, [isAuthenticated, props.history]);

  return (
    <div className='resetPassword'>
      <div className='resetPassword-wrapper'>
        <div className='resetPassword-left'>
          <h3 className='resetPassword-logo'>facebook</h3>
          <span className='resetPassword-desc'>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <form className='resetPassword-right' onSubmit={onSubmit}>
          <div className='resetPassword-box'>
            <input
              placeholder='Password'
              required
              name='password'
              value={password}
              onChange={onChange}
              type='password'
              className='resetPassword-input'
            />
            <button className='resetPassword-button' type='submit'>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
