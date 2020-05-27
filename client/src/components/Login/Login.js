import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AUTH from "../../utils/AUTH";

const useStyles = makeStyles({
    loginButton: {
        textAlign: "center"
    },
  });

const login = () => {
 AUTH.plexLogin().then(response => {
     console.log(response.data)
     const authCode = response.data.code
     console.log(authCode)
     window.location.href = `https://app.plex.tv/auth#?code=${authCode}&context[device][product]=Hankflix&context[device][environment]=bundled&context[device][layout]=desktop&context[device][platform]=Web&context[device][device]=Hankflix&clientID=b557bef578784secret441734355528&forwardUrl=http://localhost:3000`
    //  "https://app.plex.tv/auth#?code=dmsvk2s9oamixrbukq4i0hosj&context[device][product]=Ombi&context[device][environment]=bundled&context[device][layout]=desktop&context[device][platform]=Web&context[device][device]=Ombi&clientID=b557bef578784c0d84e6441734355528"
    })
}

export default function Login(props) {
    const classes = useStyles();
    return (
        <Grid container display="flex" justify="center">
            <Grid xs={12} sm={8} md={8}  className="searchBox">
                <Grid container display="flex" justify="center">
                    <Grid className={classes.loginButton} xs={12} sm={8} md={8}>
                        <Button color="primary" variant="contained" onClick={login}>Login with Plex</Button>
                    </Grid>
                </Grid>
            </Grid>   
        </Grid>
    )
};