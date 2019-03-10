import React, { Component } from 'react';
import { Row } from 'antd';
import AddMovie from "../../components/AddMovie";
import AddTelevision from "../../components/AddTelevision";
import '../../App.css';
import './home.css';
// import API from '../../utils/API'
// import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "movie"
        };
    }

    componentDidMount() {
        console.log('home');
    }

    render() {
        return (
        <div className="container">
            <Row type="flex" justify="center">
                {(this.state.view === 'movie') && (
                    <AddMovie/>
                )}
                {(this.state.view === 'television') && (
                    <AddTelevision/>
                )}
            </Row>
        </div>
        )
    }
}

export default Home;