import React, { Component } from 'react';
import API from "./utils/API";
import AUTH from "./utils/AUTH";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Row, Col, Button, Popover, Icon, Dropdown, Menu } from 'antd';
// import Home from "./pages/Home/home";
// import NoMatch from "./pages/NoMatch";
// import dotenv from "dotenv";
// import axios from 'axios';
import AddMovie from "./components/AddMovie";
import { WrappedLogin, Register } from "./components/LoginForms";
import './App.css';

const { Header, Footer, Content } = Layout;
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null,
      loggingIn: false,
      register: false,
      visable: false,
      visibleLoginMenu: false,
    }
  }
  
  // function to hide/close register popup
  hide = (userEmail) => {
    this.setState({
      visible: false,
      visibleLogin: false,
      loggedIn: false
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
      if (err) {console.log(err)}
      else(console.log(res))
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
  handleVisibleChange = (flag) => {
    this.setState({ visibleMenu: flag });
  }
  
  componentDidMount() {
    console.log(this.state);
    console.log("😎Hankflix👨‍🎤")
    AUTH.getUser().then(response => {
			console.log(response.data);
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
    API.getCollection()
      .then(function(res, err) {
        console.log(res)
      })
    
  }
  cancel = () => {
    this.setState({loggingIn: false}) 
  }
 
  render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col xs={{ span: 17, offset: 1 }}  sm={{ span: 8, offset: 4}} md={{ span:6, offset: 4}}>
              <a href="/" className="logo">
                <span className="emojis" role="img" aria-label="smiley emoji">😎</span>
                Hankflix
                <span className="emojis" role="img" aria-label="smiley emoji">👨‍🎤</span>
              </a>
            </Col>
            <Col xs={0} sm={0} md={12}>
              <div className="login">
                {/* if the user is logged in, this will appear in the header */}
                {(this.state.loggedIn === true) && (
                  <div className="loggedInText">
                    <span>{this.state.user}, we've been expecting you</span>
                    <Button className="logout" type="default" onClick={this.logout}>Logout</Button>
                  </div>)
                }
                {/* if they aren't currently logged in, OR logging in, display the login/register buttons */}
                {(this.state.loggingIn === false && this.state.loggedIn === false) && (
                  <div>
                    <Popover
                      content={<WrappedLogin login={this.login}></WrappedLogin>}
                      title="Login"
                      trigger="click"
                      visible={this.state.visibleLogin}
                      onVisibleChange={this.handleVisibleChangeLogin}>
                      <Button className="login" type="primary">Log In</Button>
                    </Popover>
                    <Popover
                      content={<Register hide={this.hide} login={this.login}></Register>}
                      title="Register"
                      trigger="click"
                      visible={this.state.visible}
                      onVisibleChange={this.handleVisibleChange}>
                      <Button className="register" type="primary">Register</Button>
                    </Popover>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={6} sm={6} md={0} align="center">
              <Dropdown 
                onVisibleChange={this.handleVisibleChange}
                visible={this.state.visibleMenu}
                overlay={
                  <Menu>
                      <Menu.Item key="1"><Icon type="user" />
                      <Popover
                        content={<WrappedLogin login={this.login}></WrappedLogin>}
                        title="Login"
                        trigger="click"
                        visible={this.state.visibleLoginXS}
                        onVisibleChange={this.handleVisibleChangeLoginXS}>
                        <Button className="loginSmall" type="primary">Log In</Button>
                      </Popover>
                      </Menu.Item>
                      <Menu.Item key="2"><Icon type="form" />
                        <Popover
                          content={<Register hide={this.hide} login={this.login}></Register>}
                          title="Register"
                          trigger="click"
                          visible={this.state.visibleLoginMenu}
                          onVisibleChange={this.handleVisibleChangeMenu}>
                          <Button className="register" type="primary">Register</Button>
                        </Popover>
                      </Menu.Item>
                      
                  </Menu>
              }>
                <Button type="primary" style={{ marginLeft: 8 }}>
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          
        </Header>
        <Content>
          <AddMovie></AddMovie>
        </Content>
        <Footer style={{ backgroundColor: '#03152a' }}>Footer</Footer>
      </Layout>
    );
  }
}

export default App;