import React, { useState, useEffect } from "react";
import AUTH from "./utils/AUTH";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthCallback from "./utils/AuthCallback";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./pages/Home/home";
import Login from "./components/Login/Login";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header/Header";
import "./App.css";

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  //useEffect mimicking componentDidMount
  useEffect(() => {
    console.log("😎Hankflix👨‍🎤");
    const loginCheck = AUTH.isLoggedIn();
    setLoggedIn(loginCheck.loggedIn);
    setUser(loginCheck.user)
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={user} />
      <div className="container">
        <Switch>
          <Route path="/signin" component={Login} />
          <Route path="/implicit/callback" component={AuthCallback} />
          <PrivateRoute
            exact
            path="/"
            component={Home}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
      <div style={{ backgroundColor: "#03152a" }}>Footer</div>
    </ThemeProvider>
  );
}

export default App;
