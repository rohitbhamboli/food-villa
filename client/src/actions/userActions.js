import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/user/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `/api/v1/user/register`,
      userData,
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// send otp
export const sendOtp = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_OTP_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/user/send-otp`,
      { email },
      config
    );

    dispatch({ type: SEND_OTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_OTP_FAIL, payload: error.response.data.message });
  }
};

// verify otp and register
export const verifyOtpAndRegister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_OTP_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `/api/v1/user/verify-otp-and-register`,
      userData,
      config
    );

    dispatch({ type: VERIFY_OTP_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: VERIFY_OTP_FAIL, payload: error.response.data.message });
  }
};

// Load User: Fetches user data if a token exists.
// This is crucial for maintaining the session across page reloads.
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    // Request user data from the /me endpoint
    const { data } = await axios.get(`/api/v1/user/me`);

    // If successful, dispatch success and payload
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    // If the token is invalid or doesn't exist, the server will return an error
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/user/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
