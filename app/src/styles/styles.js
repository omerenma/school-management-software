import { makeStyles } from "@material-ui/core/styles";

export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "250px",
    height: "250px",
  },
});

export const styleApp = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
export const TableStyle = (theme) => ({
  root: {
    width: "700px",
    height: "200px",
    position: "relative",
    left: "700px",
    top: "100px",
  },
});
