import React, { Component } from "react";
import { connect } from "react-redux";
import { get_profile_data } from "../../action/userAction";
import {
  Paper,
  Card,
  CardContent,
  Avatar,
  Divider,
  Box,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./dashboard.css";

export class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const { decoded } = this.props;
    //this.props.get_profile_data();
  };
  render() {
    const { decoded } = this.props;
    return (
      <main className="main">
        <Paper style={{ margin: "10px 20px" }}>
          <div className="profile-content-one">
            <Card>
              <div className="profile-card">Profile Image</div>
            </Card>
            <Card>
              <div className="frofile-detail">Profile detail</div>
            </Card>
          </div>
        </Paper>

        {/* <div className="main-header">
          <div className="main-header__left">
            <Paper>
              <Card>
                <CardContent>
                  <Avatar></Avatar>
                </CardContent>
                <Divider light />
                <Box display={"column"}>
                  <Box> Name:{}</Box>
                  <Box> Email:{}</Box>
                  <Box>Username</Box>
                </Box>
              </Card>
            </Paper>
          </div>
          <div className="main-header__right">
            <Paper>Item</Paper>
          </div>
        </div>

        <div className="main-overview">
          <div className="overviewcard">
            <div className="overviewcard__icon">Overview</div>
            <div className="overviewcard__info">Card</div>
          </div>
          <div className="overviewcard">
            <div className="overviewcard__icon">Overview</div>
            <div className="overviewcard__info">Card</div>
          </div>
          <div className="overviewcard">
            <div className="overviewcard__icon">Overview</div>
            <div className="overviewcard__info">Card</div>
          </div>
          <div className="overviewcard">
            <div className="overviewcard__icon">Overview</div>
            <div className="overviewcard__info">Card</div>
          </div>
        </div>

        <div className="main-cards">
          <div className="card">Card</div>
          <div className="card">Card</div>
          <div className="card">Card</div>
        </div> */}
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    //decoded: state.loging.tokenDecode,
  };
};

export default connect(mapStateToProps, { get_profile_data })(Main);
