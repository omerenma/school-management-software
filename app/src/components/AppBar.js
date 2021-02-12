import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  withStyles,
} from "@material-ui/core";
import { styleApp } from "../styles/styles";

class AppBars extends Component {
  render() {
    const { classes, variant } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{ backgroundColor: "#fff", height: 40 }}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="transparent"
              aria-label="Menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit">
              Home
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default connect()(withStyles(styleApp)(AppBars));
