import React from "react";

const NotFound = ({ location }) => {
  return (
    <>
      <h1>Rosource not found at '{location.pathname}'</h1>
    </>
  );
};

export default NotFound;
