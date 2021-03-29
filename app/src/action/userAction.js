import axios from "axios";
import decode from "jwt-decode";
//import fetch from "isomorphic-fetch";
import {
  LOADING,
  SUCCESS,
  ERROR,
  REFRESH,
  LOGING_LOADING,
  LOGING_SUCCESS,
  LOGING_ERROR,
  LOGING_REFRESH,
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_REFRESH,
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  GET_PROFILE_REFRESH,
} from "./type";

import { getAccessTokenHeader } from "../utils/checkAuth";
export const loadingRequest = () => {
  return {
    type: LOGING_LOADING,
  };
};
export const registerRequest = () => {
  return {
    type: LOADING,
  };
};
export const register_action = (data) => (dispatch) => {
  dispatch(registerRequest());
  axios
    .post("http://localhost:5000/api/user/signup/", data)
    .then((res) => {
      // const { token } = res.data;
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERROR,
        payload: err,
      })
    );
};

export const login_action = (data) => (dispatch) => {
  dispatch(loadingRequest());
  axios
    .post("http://localhost:5000/api/user/login", data)
    .then((res) => {
      //const token = res.data.token;
      //const decoded = decode(token);
      dispatch({
        type: LOGING_SUCCESS,
        payload: res.data,
        //tokenDecoded: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: LOGING_ERROR,
        payload: err.data,
      })
    );
};

// Profile Registration
export const register_profile = (data) => (dispatch) => {
  dispatch(loadingRequest());
  axios
    .post("api/profile/profile", data)
    .then((data) => {
      dispatch({
        type: PROFILE_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: PROFILE_ERROR,
        payload: err,
      });
    });
};

// Get profile data
export const get_profile_data = (id) => (dispatch) => {
  dispatch(loadingRequest());
  axios
    .get("api/profile/profile", id)
    .then((profile) =>
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: profile,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE_ERROR,
        payload: err.data,
      })
    );
};
