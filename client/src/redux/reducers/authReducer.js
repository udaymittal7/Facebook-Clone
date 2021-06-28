import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_FAIL,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR,
  RESET_PASSWORD_SUCCESS,
  USER_LOADED,
  LOAD_PROFILE_USER,
  USER_ERROR,
  UPDATE_PICTURE,
} from '../actions/types';

const initialState = {
  user: null,
  profileUser: null,
  isAuthenticated: null,
  loading: true,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case SIGNUP_USER:
    case RESET_PASSWORD_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_PICTURE:
      return {
        ...state,
        user: action.payload,
      };
    case LOAD_PROFILE_USER:
      return {
        ...state,
        profileUser: action.payload,
        loading: false,
      };
    case AUTH_FAIL:
    case EMAIL_FAIL:
    case RESET_PASSWORD_FAIL:
    case USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
