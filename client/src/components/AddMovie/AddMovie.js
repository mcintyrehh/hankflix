import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './AddMovie.css';


class AddMovie extends Component {
    render() {
        return (
            <div className="container">
                <Col span={4}></Col>
                <Col 
                    span={16}
                    className="searchBox">
                </Col>
                <Col span={4}></Col>
            </div>

        )
    }
}

export default AddMovie;