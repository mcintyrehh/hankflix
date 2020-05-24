import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";

import "../../App.css";

const useStyles = makeStyles({
    root: {
      background: "#03152a",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    headerDiv: {
        backgroundColor: "#03152a",
    },
    logo: {
        fontSize: "20pt",
        color: "whitesmoke"
    },
    a: {
        fontSize: "20pt"
    }
  });

export default function Header(props) {
    const classes = useStyles(); 


  return (
    <Grid container className={classes.headerDiv}>
        <Grid item xs={1} sm={2} md={2}/>
        <Grid item xs={"auto"} md={"auto"} sm={"auto"}>
            <Link component={RouterLink} to="/" color="inherit" className={classes.logo}>
                <span className="emojis" role="img" aria-label="smiley emoji">
                    😎
                </span>
                Hankflix
                <span className="emojis" role="img" aria-label="smiley emoji">
                    👨‍🎤
                </span>
            </Link>
        </Grid>
        <Grid item xs={"auto"} md={"auto"} sm={"auto"}>
        {!props.isLoggedIn && (
            <IconButton>
                <SettingsIcon style={{ color: "white" }}/>
            </IconButton>
        )}
        </Grid>
    </Grid>
  );
};