import React, { Component } from "react";
import AppBar from "./AppBar";
import SideBar from "./Sidebar";
import Main from "./Main";
import "./dashboard.css";
import Profile from "../UIs/RegisterProfile";
class Dashboard extends Component {
  render() {
    return (
      <div class="container">
        <AppBar />
        <SideBar />
        <Main />
        {/* <Profile /> */}
      </div>
    );
  }
}

export default Dashboard;
