import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RootContext } from "../../utils/RootContext";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CustomizedMenues from "./StyledMenu";

import "../../App.css";

const useStyles = makeStyles({
  root: {},
  headerDiv: {
    backgroundColor: "#03152a",
    padding: "10px",
  },
  logo: {
    fontSize: "20pt",
    color: "whitesmoke",
  },
  a: {
    fontSize: "20pt",
  },
  settingsIcon: {
    marginLeft: "auto",
  },
});

export default function Header(props) {
  const classes = useStyles();
  const { authenticated } = useContext(RootContext);
  return (
    <Grid container className={classes.headerDiv}>
      <Grid item xs={1} sm={2} md={2} />
      <Grid item xs={5} sm={5} md={5}>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          className={classes.logo}
        >
          <span className="emojis" role="img" aria-label="smiley emoji">
            😎
          </span>
          Hankflix
          <span className="emojis" role="img" aria-label="smiley emoji">
            👨‍🎤
          </span>
        </Link>
      </Grid>
      <Grid item xs={5} md={3} sm={3}>
        <Grid container>
          <Grid item className={classes.settingsIcon}>
            {!!authenticated && <CustomizedMenues user={props.user} />}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={2} md={2} />
    </Grid>
  );
}
