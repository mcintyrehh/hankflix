import React, { Component } from 'react';
import API from "./utils/API";
import AUTH from "./utils/AUTH";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Row, Col, Button, Popover, Icon } from 'antd';
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
      visable: false
    }
  }
  
  // function to hide/close register popup
  hide = (userEmail) => {
    this.setState({
      visible: false,
    })
  }
  login = (userEmail) => {
    this.setState({
      user: userEmail,
      loggedIn: true
    })
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }
  componentDidMount() {
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
  loggingIn = () => {
    this.setState({loggingIn: true})
  }
  cancel = () => {
    this.setState({loggingIn: false}) 
  }
  render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={4}></Col>
            <Col span={3}>
              <div className="logo">
                <span role="img" aria-label="smiley emoji">😎</span>
                Hankflix
                <span role="img" aria-label="smiley emoji">👨‍🎤</span>
              </div>
            </Col>
            <Col span={13}>
              <div className="login">
                {/* if the user is logged in, this will appear in the header */}
                {(this.state.loggedIn === true) && (<div className="loggedIn">{this.state.user}, we've been expecting you</div>)}
                {/* if they aren't currently logged in, OR logging in, display the login/register buttons */}
                {(this.state.loggingIn === false && this.state.loggedIn === false) && (
                  <div>
                    <Button className="login" type="primary" onClick={this.loggingIn}>Log In</Button>
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
                {this.state.loggingIn === true && (
                <div>
                  <WrappedLogin style={{marginTop: "5px", transition: 10, right: 0}} login={this.login} cancel={this.cancel}></WrappedLogin>
                </div>
                )}
              </div>
            </Col>
            <Col span={4}></Col>
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