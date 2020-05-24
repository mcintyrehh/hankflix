import React, { Component } from 'react';
import AUTH from "./utils/AUTH";
import { Route, Switch } from "react-router-dom";
import { Layout, Row, Col, Button, Popover, Icon, Dropdown, Menu,  } from 'antd';
import Home from "./pages/Home/home";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header/Header";
import { WrappedLogin, Register } from "./components/LoginForms";
import './App.css';

const { Footer, Content } = Layout;
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
      // if (err) {console.log(err)}
      // else(console.log(res))
      this.setState({loggedIn: false, user: null, loggingIn: false})
    })
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }
  handleVisibleChangeLogin = (visibleLogin) => {
    this.setState({ visibleLogin })
  }
  handleVisibleChangeLoginXS = (visibleLoginXS) => {
    this.setState({ visibleLoginXS })
  }
  handleVisibleChangeMenu = (visibleLoginMenu) => {
    this.setState({ visibleLoginMenu })
  }
  handleVisibleChangeMenuDropdown = (visibleMenu) => {
    this.setState({ visibleMenu})
  }
  handleVisibleChangeRegisterPop = (visibleRegisterPop) => {
    this.setState({ visibleRegisterPop })
  }
  handleVisibleChangeMenu = (flag) => {
    this.setState({ visibleMenu: flag });
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
      <Layout>
        <Header/>
        <Content>
          <div className="container">
            {/* <Row> <Link></Link><Button>TV</Button></Row> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ backgroundColor: '#03152a' }}>Footer</Footer>
      </Layout>
    );
  }
}

export default App;