import React, { Component } from "react";
import { Paper, Card, Grid } from "@material-ui/core";
import { Avatar } from "@material-ui/core/";

class Profile extends Component {
  render() {
    return (
      <Paper
        style={{
          position: "relative",
          left: "32%",
          width: "69%",
        }}
      >
        <Grid
          xs={12}
          style={{
            display: "flex",
            // padding: 20,
          }}
        >
          <Grid xs={4}>
            <Card>
              <Avatar
                Sharp
                alt="Kings"
                style={{
                  position: "relative",
                  left: 120,
                  width: "90px",
                  height: "90px",
                }}
              />
            </Card>
          </Grid>
          <Grid xs={8} style={{ backgroundColor: "burlywood", marginLeft: 10 }}>
            <Grid>Card Two</Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Profile;
