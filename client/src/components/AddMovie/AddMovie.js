import React, { Component } from 'react';
import { Col, Input } from 'antd';
import './AddMovie.css';

// const Search = Input.Search;

class AddMovie extends Component {
    constructor() {
        super();
        this.state = {
            queryTitle: '',
            queryYear: '',
            queryID: ''
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
    }
    render() {
        return (
            <div className="container">
                <Col span={4}></Col>
                <Col span={16}
                     className="searchBox">
                     <div className="searchHeadline">IMDb Movie Search</div>
                     <Col className="searchLine" span={24}>
                        <span style={{marginRight: 5}}> Title: </span>
                        <Input
                            placeholder="Jaws" 
                            style={{width: 200}}
                            name="queryTitle"
                            value={this.state.queryYear}
                            onChange={this.handleChange}>
                        </Input>
                        <span style={{marginRight: 5, marginLeft: 15}}>Year: </span>
                        <Input
                            placeholder="1975" 
                            style={{width:100}}
                            name="queryYear"
                            value={this.state.queryYear}
                            onChange={this.handleChange}>
                        </Input>
                     </Col>
                </Col>

                <Col span={4}></Col>
            </div>

        )
    }
}

export default AddMovie;