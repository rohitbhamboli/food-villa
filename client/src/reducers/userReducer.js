// Import all user-related action types
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

// Define the initial state for the user reducer

// Retrieve user data from localStorage to persist session
const storedUser = localStorage.getItem("user");

const initialState = {
  // Safely parse the user from localStorage.
  // Checks if storedUser exists and is not the string "undefined" before parsing.
  user:
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  loading: false,
  // Set initial authentication status based on the presence of a valid user in localStorage
  isAuthenticated: storedUser && storedUser !== "undefined" ? true : false,
  error: null,
  message: null,
  tempUser: null,
};

// Define the user reducer function
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case SEND_OTP_REQUEST:
    case VERIFY_OTP_REQUEST:
      // Set loading to true when a login, register, or load user request begins
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case VERIFY_OTP_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      // On successful login, registration, or user load, update the state
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        tempUser: null,
      };

    case SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        tempUser: action.payload.tempUser,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("user");
      // On successful logout, clear user data and set isAuthenticated to false
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
        tempUser: null,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
    case SEND_OTP_FAIL:
    case VERIFY_OTP_FAIL:
      // On failed login or registration, update the state with the error
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        tempUser: null,
      };

    case LOAD_USER_FAIL:
      // On failed user load, update the state
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        tempUser: null,
      };

    case LOGOUT_FAIL:
      // On failed logout, update the state with the error
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      // Clear any errors in the state
      return {
        ...state,
        error: null,
      };

    default:
      // Return the current state for any other actions
      return state;
  }
};