import React, { Component } from 'react';
import API from "./utils/API";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Row, Col, Button } from 'antd';
// import Home from "./pages/Home/home";
// import NoMatch from "./pages/NoMatch";
// import dotenv from "dotenv";
// import axios from 'axios';
import AddMovie from "./components/AddMovie";
import HorizontalLogin from "./components/HorizontalLogin";
import './App.css';

const { Header, Footer, Content } = Layout;
class App extends Component {
  state = {
    login: false,
    register: false
  }
  componentDidMount() {
    console.log("😎Hankflix👨‍🎤")
    API.getCollection()
  }
  login = () => {
    this.setState({login: true})
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
            <Col span={7}>
              <div className="logo"><span role="img" aria-label="smiley emoji">😎</span>Hankflix<span role="img" aria-label="smiley emoji">👨‍🎤</span></div>
            </Col>
            <Col span={9}>
              <div className="login">
                {this.state.login === false && (
                  <div>
                    <Button className="login" type="primary" onClick={this.login}>Log In</Button>
                    <Button className="register" type="primary">Register</Button>
                  </div>
                )}
                {this.state.login === true && (
                <div>
                  <HorizontalLogin style={{marginTop: "5px", transition: 10, right: 0}} cancel={this.cancel}></HorizontalLogin>
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