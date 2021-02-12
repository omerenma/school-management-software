import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import TableData from "./Table";
import { makeStyles, withStyles, Fab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/MenuOpen";
import transitions from "@material-ui/core/styles/transitions";
import zIndex from "@material-ui/core/styles/zIndex";

import AppBars from "./Dashboard/AppBar";
import SideBar from "./Dashboard/Sidebar";
import Main from "./Dashboard/Main";

const drawerWidth = 240;
const style = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});
class Drawers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  setOpen = () => {
    this.setState({ open: true });
  };
  onClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, variant } = this.props;
    return (
      <div className={classes.root}>
        <AppBars />
        <CssBaseline />
        <SideBar />
        <Main />
      </div>
    );
  }
}
export default connect()(withStyles(style)(Drawers));
