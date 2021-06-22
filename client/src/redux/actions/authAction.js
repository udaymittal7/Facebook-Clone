import axios from 'axios';
import {
  SIGNUP_USER,
  LOGIN_USER,
  AUTH_FAIL,
  EMAIL_SUCCESS,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR,
  RESET_PASSWORD_SUCCESS,
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
      const res = await axios.patch('/api/auth/forgotPassword', email, config);
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
      const { url, password } = data;
      const res = await axios.patch(`/api/auth${url}`, { password }, config);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data.user,
      });
    } catch (err) {
      console.log(err);
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
