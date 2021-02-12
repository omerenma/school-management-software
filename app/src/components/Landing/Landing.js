import React, { Component } from "react";
import Signup from "../Auth/Signup";

class Landing extends Component {
  render() {
    return (
      <div className="landing-page">
        <h1>SMS Landing Page</h1>
        <Signup />
      </div>
    );
  }
}

export default Landing;
