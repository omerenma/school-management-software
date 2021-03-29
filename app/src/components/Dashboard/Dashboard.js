import React, { Component } from "react";
import Header from "./Header";
import Drawer from "./SideBar";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Drawer />
      </div>
    );
  }
}

export default Dashboard;
