import React, { Component } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import { styles } from "./style";

import {
  Collapse,
  CssBaseline,
  Drawer,
  Fab,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  Attendance,
  LeaveAppIcon,
  MenuItenCoinStack,
  PeopleIcon,
  //LeaveAppIcon,
  SelfServiceIcon,
  SettingsIcon,
  TimeSheet,
} from "../../icons/Svg";
import { StyledListItem, StyledMenu, StyledMenuItem } from "../Dashboard/style";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openNest: "",
      prevNest: "",
      anchorEl: null,
    };
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = (item, index) => {
    if (item.children && this.state.openNest === index) {
      this.setState({ openNest: "" });
    } else if (item.children) {
      this.setState({ openNest: index });
      !this.state.open && this.props.handleDrawerOpen();
    } else {
      this.props.history.push(item.link);
      // eslint-disable-next-line no-unused-expressions
      this.state.open
        ? this.state.open && this.props.handleDrawerClose()
        : !this.state.open && this.props.handleDrawerOpen();
    }
  };

  render() {
    const { openNest, anchorEl } = this.state;
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
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.drawerToggle}>
            {open ? (
              <Fab
                aria-label="add"
                classes={{ root: classes.fab }}
                size="small"
                onClick={handleDrawerClose}
              >
                <ChevronLeftIcon color="inherit" />
              </Fab>
            ) : (
              ""
            )}
            <div className={classes.appnameLogo}>
              {open ? (
                <LeaveAppIcon
                  style={{ position: "absolute", top: 16, left: 22 }}
                />
              ) : (
                <MenuIcon
                  color="inherit"
                  onClick={handleDrawerOpen}
                  className={classes.menuIcon}
                />
              )}
              {open ? (
                <Typography
                  variant="h2"
                  id="buizName"
                  className={classes.appName}
                >
                  Leave
                </Typography>
              ) : (
                ""
              )}

              <span
                aria-owns={anchorEl ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                className={classes.appSwitchArrowBtn}
              >
                {anchorEl ? (
                  <ArrowDropUpIcon
                    onClick={this.handleProfileMenuOpen}
                    className={classes.companyButton}
                  />
                ) : (
                  <ArrowDropDownIcon
                    onClick={this.handleProfileMenuOpen}
                    className={classes.companyButton}
                  />
                )}
              </span>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => this.setState({ anchorEl: null })}
                classes={{ paper: classes.appSwitchMenu }}
                autoFocus={false}
                disableAutoFocusItem={true}
              >
                {this.props.apps &&
                  this.props.apps.map((app) => {
                    return app["app-name"] === "People" ? (
                      <StyledMenuItem
                        onClick={() =>
                          this.props.history.push("/people/dashboard")
                        }
                        classes={{ root: classes.menuItem }}
                      >
                        <PeopleIcon className={classes.menuListIcons} />
                        <span style={{ marginLeft: 15 }}>People</span>
                      </StyledMenuItem>
                    ) : app["app-name"] === "Settings" ? (
                      <StyledMenuItem
                        onClick={() =>
                          this.props.history.push("/settings/users")
                        }
                        classes={{ root: classes.menuItem }}
                      >
                        <SettingsIcon className={classes.menuListIcons} />
                        <span style={{ marginLeft: 12 }}>Settings</span>
                      </StyledMenuItem>
                    ) : app["app-name"] === "Payroll" ? (
                      <StyledMenuItem
                        onClick={() => this.props.history.push("/payroll")}
                        classes={{ root: classes.menuItem }}
                      >
                        {
                          <MenuItenCoinStack
                            className={classes.menuListIcons}
                          />
                        }
                        <span style={{ marginLeft: 15 }}>Payroll</span>
                      </StyledMenuItem>
                    ) : app["app-name"] === "Leave" ? (
                      <StyledMenuItem
                        onClick={() => this.props.history.push("/leave")}
                        classes={{ root: classes.menuItem }}
                        disabled
                      >
                        <LeaveAppIcon className={classes.menuListIcons} />
                        <span style={{ marginLeft: 15 }}>Leave</span>
                      </StyledMenuItem>
                    ) : app["app-name"] === "Attendace" ? (
                      <StyledMenuItem
                        onClick={this.handleClose}
                        classes={{ root: classes.menuItem }}
                      >
                        <Attendance className={classes.menuListIcons} />
                        <span style={{ marginLeft: 15 }}> Attendance</span>
                      </StyledMenuItem>
                    ) : app["app-name"] === "Time Sheet" ? (
                      <StyledMenuItem
                        onClick={this.handleClose}
                        classes={{ root: classes.menuItem }}
                      >
                        <TimeSheet className={classes.menuListIcons} />
                        <span style={{ marginLeft: 15 }}>Time Sheet</span>
                      </StyledMenuItem>
                    ) : app["app-name"] === "Self service" ? (
                      <StyledMenuItem
                        onClick={() =>
                          this.props.history.push("/selfservice/dashboard")
                        }
                        classes={{ root: classes.menuItem }}
                      >
                        <SelfServiceIcon className={classes.menuListIcons} />
                        <span style={{ marginLeft: 15 }}> Self service</span>
                      </StyledMenuItem>
                    ) : (
                      "No app available"
                    );
                  })}
              </StyledMenu>
            </div>
          </div>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.listRoot}
          ></List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles, { withTheme: true })(Sidebar)));
