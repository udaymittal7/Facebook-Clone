import React, { useState } from 'react';
import './forgotPassword.css';
import { useDispatch } from 'react-redux';

import { sendResetPasswordEmail } from '../../redux/actions/authAction';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetPasswordEmail({ email }));
  };

  return (
    <div className='forgotPassword'>
      <div className='forgotPassword-wrapper'>
        <div className='forgotPassword-left'>
          <h3 className='forgotPassword-logo'>facebook</h3>
          <span className='forgotPassword-desc'>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <form className='forgotPassword-right' onSubmit={onSubmit}>
          <div className='forgotPassword-box'>
            <div className='forgotPassword-header'>Reset Your Password</div>
            <input
              placeholder='Enter your email'
              required
              name='email'
              className='forgotPassword-input'
              value={email}
              onChange={onChange}
            />
            <button className='forgotPassword-button' type='submit'>
              Send code via email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
