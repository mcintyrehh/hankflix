import React, { Component } from 'react';
import API from "./utils/API";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Row, Col } from 'antd';
// import Home from "./pages/Home/home";
// import NoMatch from "./pages/NoMatch";
import AddMovie from "./components/AddMovie";
import './App.css';

const { Header, Footer, Content } = Layout;
class App extends Component {
  componentDidMount() {
    const testReq = {
      title: "Replicas",
      imdb_id: "tt4154916",
      poster_url: "http://image.tmdb.org/t/p/w500/kEuIYDEJ9ReBbJLb7QeP9KdbjEe.jpg"
    }
    API.newRequest(testReq);
  }
  render() {
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <div className="logo">😎Hankflix👨‍🎤</div>
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
