import React, { Component } from "react";
import "./dashboard.css";

export class Sidebar extends Component {
  render() {
    return (
      <aside className="sidenav">
        <ul className="sidenav_list">
          <li className="sidenav__list-item">
            <a href="#">Profile</a>
          </li>
          <li className="sidenav__list-item">
            <a href="#">Link 2</a>
          </li>
          <li className="sidenav__list-item">
            <a href="#">Link 3</a>
          </li>
          <li className="sidenav__list-item">
            <a href="#">Link 4</a>
          </li>
          <li className="sidenav__list-item">
            <a href="#">Link 5</a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
