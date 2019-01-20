import React, { Component } from 'react';
import API from "./utils/API";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Row, Col } from 'antd';
// import Home from "./pages/Home/home";
// import NoMatch from "./pages/NoMatch";
// import dotenv from "dotenv";
// import axios from 'axios';
import AddMovie from "./components/AddMovie";
import './App.css';

const { Header, Footer, Content } = Layout;
class App extends Component {
  componentDidMount() {
    console.log("😎Hankflix👨‍🎤")
    API.getCollection()
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <div className="logo"><span role="img" aria-label="smiley emoji">😎</span>Hankflix<span role="img" aria-label="smiley emoji">👨‍🎤</span></div>
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