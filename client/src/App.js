import React, { Component } from 'react';
import API from "./utils/API";
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
  state = {
    login: false,
    register: false,
    visable: false
  }
  // function to hide/close register popup
  hide = () => {
    this.setState({
      visible: false,
    })
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }
  componentDidMount() {
    console.log("😎Hankflix👨‍🎤")
    API.getCollection()
      .then(function(res, err) {
        console.log(res)
      })
  }
  login = () => {
    this.setState({login: true})
  }
  register = () => {
    // this.setState({register: true})
  }
  cancel = () => {
    this.setState({login: false})
  }
  render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={4}></Col>
            <Col span={3}>
              <div className="logo"><span role="img" aria-label="smiley emoji">😎</span>Hankflix<span role="img" aria-label="smiley emoji">👨‍🎤</span></div>
            </Col>
            <Col span={13}>
              <div className="login">
                {(this.state.login === false && this.state.register === false) && (
                  <div>
                    <Button className="login" type="primary" onClick={this.login}>Log In</Button>
                    <Popover
                      content={<Register></Register>}
                      title="Register"
                      trigger="click"
                      visible={this.state.visible}
                      onVisibleChange={this.handleVisibleChange}>
                      <Button className="register" type="primary" onClick={this.register}>Register</Button>
                    </Popover>
                  </div>
                )}
                {this.state.login === true && (
                <div>
                  <WrappedLogin style={{marginTop: "5px", transition: 10, right: 0}} cancel={this.cancel}></WrappedLogin>
                </div>
                )}
                {this.state.register === true && (
                  <div>
                    <Register></Register>
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