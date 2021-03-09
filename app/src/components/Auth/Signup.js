import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withRouter, Link } from "react-router-dom";
import { register_action } from "../../action/userAction";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Dimmer,
  Message,
} from "semantic-ui-react";
import "../../Apps.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
      password: "",
    };
  }
  HandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password,
      open: false,
    };
    this.props.register_action(data);
  };
  HandleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return this.setState({ open: false });
    }
  };
  render() {
    const { loading, success, error } = this.props;
    return (
      <div className="signup">
        {/* {success == true ? this.props.history.push("/dashboard") : ""} */}
        {success == true ? (
          <Snackbar
            open={!this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              Success!
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              We could not process your request now! please try again
            </Alert>
          </Snackbar>
        )}
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="" />
              <span
                style={{
                  position: "relative",
                  left: "-175px",
                  color: "#f4f4f4",
                }}
              >
                {" "}
                Sign Up
              </span>
            </Header>
            <Form size="large" onSubmit={this.HandleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.HandleChange}
                />
                <Form.Input
                  fluid
                  icon="envelope"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="text"
                  name="email"
                  noValidate
                  value={this.state.email}
                  onChange={this.HandleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Role"
                  type="text"
                  name="role"
                  value={this.state.role}
                  onChange={this.HandleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.HandleChange}
                />

                <Button color="teal" fluid size="large">
                  <span>
                    {loading == true ? (
                      <Loader
                        type="ThreeDots"
                        color="#ffffff"
                        height={30}
                        width={30}
                      />
                    ) : (
                      " Sign up"
                    )}
                  </span>
                </Button>
              </Segment>
            </Form>
            <Message>
              Already subscribed? <Link to="/">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.register.loading,
  success: state.register.success,
  error: state.register.error,
});

export default connect(mapStateToProps, { register_action })(Signup);
