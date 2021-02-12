import React, { Component, useState } from "react";
import { connect } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

import { TableStyle } from "../styles/styles";

const data = [
  {
    id: 1,
    name: "Onyebuchi Kingsley",
    sex: "Male",
    profession: "Software developer",
  },
  {
    id: 2,
    name: "Mary Kingsley",
    sex: "Female",
    profession: "Business analyst",
  },
  {
    id: 3,
    name: "Buky Oyenale",
    sex: "Female",
    profession: " developer",
  },
  {
    id: 4,
    name: "Buky Daniel",
    sex: "Female",
    profession: " Cooke",
  },
];

const startButton = ({ row, onClick }) => (
  <IconButton
    onClick={onClick}
    color={row.status === "off" ? "primary" : "default"}
    disabled={row.status === "running"}
  >
    <PlayArrowIcon fontSize="small" />
  </IconButton>
);

const stopButton = ({ row, onClick }) => (
  <IconButton
    onClick={onClick}
    color={row.status === "running" ? "primary" : "default"}
    disabled={row.status === "off"}
  >
    <PlayArrowIcon fontSize="small" />
  </IconButton>
);
class MuiTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  onSearch = (e) => {
    this.setState({ search: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          name="search"
          id="search"
          value={this.state.search}
          onChange={this.onSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Profession</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter(
                (item) =>
                  !this.state.search || item.name.includes(this.state.search)
              )
              .map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.sex}</TableCell>
                    <TableCell>{item.profession}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default connect()(withStyles(TableStyle)(MuiTable));
