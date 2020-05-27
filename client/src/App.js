import React, { Component } from 'react';
import AUTH from "./utils/AUTH";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthCallback from "./utils/AuthCallback";
import { Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./pages/Home/home";
import Login from "./components/Login/Login";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header/Header";
import './App.css';

const { Footer } = Layout;
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
      loggingIn: false,
      register: false,
      visible: false,
      visibleMenu: false,
      visibleLoginMenu: false,
      visibleRegisterPop: false,
    }
  }
  
  // function to hide/close register popup
  hide = (userEmail) => {
    this.setState({
      visible: false,
      visibleLogin: false,
      loggedIn: false,
      visibleLoginXS: false,
    })
  }
  login = (userEmail) => {
    this.setState({
      user: userEmail,
      loggedIn: true,
    })
  }
  logout = () => {
    AUTH.logout()
    .then((res, err) => {
      // if (err) {console.log(err)} b557bef578784secret441734355528
      // else(console.log(res))
      this.setState({loggedIn: false, user: null, loggingIn: false})
    })
  }

  componentDidMount() {
    // console.log(this.state);
    console.log("😎Hankflix👨‍🎤")
    AUTH.getUser().then(response => {
			console.log(response.data.user);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user.email
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		})  
  }
  cancel = () => {
    this.setState({loggingIn: false}) 
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header/>
        <div className="container">
          <Switch>
            <Route path="/signin" component={Login} />
            <Route path="/implicit/callback" component={AuthCallback}/>
            <PrivateRoute exact path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer style={{ backgroundColor: '#03152a' }}>Footer</Footer>
      </ThemeProvider>

    );
  }
}

export default App;