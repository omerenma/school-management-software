import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login_action } from "../../action/userAction";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import "../../Apps.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  HandleSubmit = (e) => {
    const { success, history } = this.props;
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login_action(data);
    history.push("/dashboard");
  };
  HandleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { success } = this.props;

    return (
      <div>
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
                Log-in
              </span>
            </Header>
            <Form size="large" onSubmit={this.HandleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                  name="email"
                  value={this.state.email}
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
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Haven't subscribed? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const styles = {
  root: {
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};
const mapStateToProps = (state) => ({
  error: state.loging.error,
  success: state.loging.success,
});
export default connect(mapStateToProps, { login_action })(withRouter(Login));
