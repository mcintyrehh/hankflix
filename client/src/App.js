import React, { Component } from 'react';
import logo from './logo.svg';
import API from "./utils/API";
import './App.css';


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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
