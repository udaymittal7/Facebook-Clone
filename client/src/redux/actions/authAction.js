import axios from 'axios';
import {
  SIGNUP_USER,
  LOGIN_USER,
  AUTH_FAIL,
  EMAIL_SUCCESS,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR,
} from './types';

export const signup = (user) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/auth/register', user, config);
      dispatch({
        type: SIGNUP_USER,
        payload: res.data.user,
      });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: AUTH_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/auth/login', user, config);
      dispatch({
        type: LOGIN_USER,
        payload: res.data.user,
      });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: AUTH_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

export const sendResetPasswordEmail = (email) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/users/forgotPassword', email, config);
      dispatch({
        type: EMAIL_SUCCESS,
        payload: res.data.message,
      });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: EMAIL_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

export const resetPassword = (data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      console.log(data);
      const token = data.token;
      const res = await axios.patch(
        `/api/reset/${token}`,
        data.password,
        config
      );
      dispatch({
        type: EMAIL_SUCCESS,
        payload: res.data.message,
      });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
