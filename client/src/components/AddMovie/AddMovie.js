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
            queryYear: '',
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
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    searchByTerm = () => {
        let self = this;
        this.setState({ iconLoadingTitle: "true" })
        console.log(`Title: ${this.state.queryTitle} Year: ${this.state.queryYear}`) 
        const query = this.state.queryTitle;
        API.searchByTerm(query)
            .then(function(response) {
                console.log(response.data);
                const queryData = response.data;
                self.setState({ searchResponse: queryData });
                self.setState({ iconLoadingTitle: "false" });

            })
            .catch(function(err) {
                console.log(err);
            })
    }
    searchByID = () => {
        this.setState({ iconLoadingID: true })
        console.log(`IMDb ID: ${this.state.queryID}`)
        // const imdbID = this.state.queryID;
    }
    render() {
        return (
            <Col md={16} sm={24} className="searchBox">
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
                            name="queryTitle"
                            value={this.state.queryTitle}
                            onChange={this.handleChange}
                            loading={this.state.iconLoadingTitle}
                            onSearch={this.searchByTerm}>
                        </Search>
                    </Col>                     
                </Row>
                <Row type="flex" justify="center">
                    <Col 
                    span={9}
                    style={{
                        textAlign: "center", 
                        borderBottom: "1px white solid",
                        margin: 10}}>By IMDb ID</Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col className="searchLine" span={10}>
                        <Search
                            placeholder="tt0073195" 
                            name="queryID"
                            enterButton
                            value={this.state.queryID}
                            onChange={this.handleChange}
                            loading={this.state.iconLoadingID}
                            onSearch={this.searchById}>
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
            </Col>
        )
    }
}

export default AddMovie;