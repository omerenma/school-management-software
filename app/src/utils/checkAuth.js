import React, { Component } from "react";
import store from "../store";

export const getAccessTokenHeader = () => {
  let accessToken;
  try {
    accessToken = store.getState().loging.data.token;
  } catch (error) {
    return null;
  }
  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }
  return null;
};
