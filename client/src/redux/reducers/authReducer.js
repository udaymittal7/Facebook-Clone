import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_FAIL,
  EMAIL_FAIL,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR,
  RESET_PASSWORD_SUCCESS,
} from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case SIGNUP_USER:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_FAIL:
    case EMAIL_FAIL:
    case RESET_PASSWORD_FAIL:
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
