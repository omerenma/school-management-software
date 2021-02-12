import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, Chip } from "@material-ui/core";

import { styles } from "../styles/styles";

class ScreenSizes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs="auto" sm="auto" md="auto">
            <Paper className={classes.paper}>
              <h5>Title</h5>
              <p>This is a simple paragrapgh</p>
            </Paper>
          </Grid>

          <Grid item xs="auto" sm="auto" md="auto">
            <Paper className={classes.paper}>
              <h5>Title</h5>
              <p>This is a simple paragrapgh</p>
            </Paper>
          </Grid>
          <Grid item xs="auto" sm="auto" md="auto">
            <Paper className={classes.paper}>
              <h5>Title</h5>
              <p>This is a simple paragrapgh</p>
            </Paper>
          </Grid>
          <Grid item xs="auto" sm="auto" md="auto">
            <Paper className={classes.paper}>
              <h5>Title</h5>
              <p>This is a simple paragrapgh</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default connect()(withStyles(styles)(ScreenSizes));
