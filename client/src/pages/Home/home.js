import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { Row, Col } from 'antd';

import '../../App.css';
import './home.css';
import API from '../../utils/API'
import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "test"
        };
    }

    componentDidMount() {
        this.loadFakeArticles();
    }

    render() {
        console.log(this.state.fakeNews);
        return (

            <div>Home Div</div>

        )
    }
}

export default Home;