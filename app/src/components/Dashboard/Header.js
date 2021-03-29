import React, { Component } from "react";
import { connect } from "react-redux";
import clsx from "clsx";

import { AppBar, CssBaseline, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { styles } from "./style";

export class Header extends Component {
  render() {
    const {
      handleDrawerClose,
      handleDrawerOpen,
      classes,
      open,
      location,
      isLoading,
      dataError,
      dataErrorMessage,
    } = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            [classes.appbarNormal]: !open,
          })}
        >
          <h1>Header</h1>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles, { withTheme: true })(Header)));
