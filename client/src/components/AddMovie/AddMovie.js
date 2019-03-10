import React, { Component } from 'react';
import { Col, Row, Input, } from 'antd';
import API from "../../utils/API";
// import axios from 'axios';
import './AddMovie.css';
import { MovieCard } from '../Card'

// const Search = Input.Search;
const json = require('./data.json');
const Search = Input.Search;
class AddMovie extends Component {
    constructor() {
        super();
        this.state = {
            queryTitle: '',
            queryID: '',
            iconLoadingTitle: "false",
            iconLoadingID: "false",
            searchResponse: []
        }
    }
    componentDidMount = () => {
        this.setState({searchResponse: json})
        API.getCollection()
        .then(function(res, err) {
          console.log(res)
        })
        
    }
    handleChange = (event) => {
        console.log("noice");
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    searchByTerm = () => {
        if (!!this.state.queryTitle) {
            this.setState({ iconLoadingTitle: "true" })
            console.log(`Title: ${this.state.queryTitle}`) 
            const query = this.state.queryTitle;
            API.searchByTerm(query)
                .then(response => {
                    console.log(response.data);
                    const queryData = response.data;
                    this.setState({ searchResponse: queryData });
                    this.setState({ iconLoadingTitle: "false" });
    
                })
                .catch(function(err) {
                    console.log(err);
                })    
        }
        else { return }
    }

    render() {
        return (
        <>
            <div className="searchHeadline">IMDb Movie Search</div>
            <Row type="flex" justify="center">
                <Col 
                span={9}
                style={{
                    textAlign: "center", 
                    borderBottom: "1px white solid",
                    margin: 10}}>By Title</Col>
            </Row>
            <Row type="flex" justify="center">
                <Col className="searchLine" span={10}>
                    <Search
                        placeholder="Jaws" 
                        enterButton
                        allowClear
                        name="queryTitle"
                        value={this.state.queryTitle}
                        onChange={this.handleChange}
                        loading={this.state.iconLoadingTitle}
                        onSearch={this.searchByTerm}>
                    </Search>
                </Col>                     
            </Row>
            <Row className="cardBox" type="flex" justify="center">
                <Col
                    span={20}
                    style={{ 
                    minHeight: 40,
                    marginBottom: 20,
                    textAlign: "center"}}>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {this.state.searchResponse.map(movie=><MovieCard key={movie.titleSlug} newRequest={this.newRequest} movie={movie}/>)}
                    </div>
                </Col>
            </Row>
        </>
        )
    }
}

export default AddMovie;