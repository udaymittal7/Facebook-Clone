import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  SIGNUP_USER,
  LOGIN_USER,
  AUTH_FAIL,
  EMAIL_SUCCESS,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR,
  RESET_PASSWORD_SUCCESS,
  USER_LOADED,
  LOAD_PROFILE_USER,
  UPDATE_PICTURE,
  USER_ERROR,
  UPDATE_USER,
  REMOVE_FRIEND,
  SEND_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  LOGOUT_USER,
} from './types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
        payload: res.data,
      });

      toast.success('Registered Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: AUTH_FAIL,
        payload: err.response.data.message,
      });

      if (err.response.data.message === 'User with that email already exists') {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        toast.error('Some error occurred. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
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
        payload: res.data,
      });

      toast.success('Logged In Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AUTH_FAIL,
        payload: err,
      });

      if (
        err.response.data.message === 'User not found' ||
        err.response.data.message === 'Wrong password'
      ) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else {
        toast.error('Some error occurred. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    setAuthToken();
    dispatch({ type: LOGOUT_USER });
    toast.success('Logged Out', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
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
      toast.success('Email sent successfully! Check your mail.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: EMAIL_FAIL,
        payload: err.response.data.message,
      });
      toast.error('Error sending mail. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
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
        payload: res.data,
      });
      toast.success('Password successfully changed.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: err.response.data.message,
      });
      toast.error('Some error occurred. Try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_FAIL });
    }
  };
};

export const loadProfileUser = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/user/${id}`);
      dispatch({
        type: LOAD_PROFILE_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_FAIL });
    }
  };
};

export const updatePicture = (id, formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.patch(
        `/api/user/updateUser/${id}`,
        formData,
        config
      );
      dispatch({
        type: UPDATE_PICTURE,
        payload: res.data,
      });
      toast.success('Picture uploaded.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: USER_ERROR });
      toast.error('Some error occurred. Try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
};

export const updateUser = (id, data) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.patch(`/api/user/updateUser/${id}`, data, config);
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });

      toast.success('User details updated.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: USER_ERROR });
      toast.error('Some error occurred. Try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
};

export const removeUserFriend = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.patch(`/api/user/removeFriend/${id}`, config);
      dispatch({
        type: REMOVE_FRIEND,
        payload: res.data.user,
      });

      toast.success('Friend removed.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: USER_ERROR });
      toast.error('Some error occurred. Try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
};

export const sendFriendRequest = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.patch(
        `/api/user/sendFriendRequest/${id}`,
        config
      );
      dispatch({
        type: SEND_FRIEND_REQUEST,
        payload: res.data.user,
      });

      toast.success('Request sent.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: USER_ERROR });
      toast.error('Some error occurred. Try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
};

export const acceptFriendRequest = (id) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.patch(
        `/api/user/acceptFriendRequest/${id}`,
        config
      );
      dispatch({
        type: ACCEPT_FRIEND_REQUEST,
        payload: res.data.user,
      });

      toast.succes('You both are now friends.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: USER_ERROR });
      toast.error('Some error occurred. Try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
