import React, { Component } from 'react';
import { Col, Row, Input, Button } from 'antd';
import API from "../../utils/API";
import axios from 'axios';
import './AddMovie.css';
import { MovieCard } from '../Card'

// const Search = Input.Search;
const json = require('./data.json');
class AddMovie extends Component {
    constructor() {
        super();
        this.state = {
            queryTitle: '',
            queryYear: '',
            queryID: '',
            iconLoadingTitle: false,
            iconLoadingID: false,
            searchResponse: []
        }
    }
    newRequest =(movieInfo) => {
        const req = {
            title: movieInfo.title,
            imdb_id: movieInfo.imdbID,
            poster_url: movieInfo.URL
          }
          API.newRequest(req);
        console.log("yuuuuup");
        console.log(movieInfo);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
    }
    searchByYear = () => {
        let self = this;
        this.setState({ iconLoadingTitle: true })
        console.log(`Title: ${this.state.queryTitle} Year: ${this.state.queryYear}`) 
        const queryURL = `https://www.omdbapi.com/?s=${(this.state.queryTitle).trim()}&y=${this.state.queryYear}&type=movie&apikey=e73085d6`
        axios.post(queryURL).then(function(response) {
            const queryData = response.data.Search
            console.log(queryData);
            self.setState({ searchResponse: queryData });
            self.setState({ iconLoadingTitle: false });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    searchByID = () => {
        this.setState({ iconLoadingID: true })
        console.log(`IMDb ID: ${this.state.queryID}`)
    }
    render() {
        return (
            <div className="container">
                <Row type="flex" justify="center">
                    <Col span={16}
                        className="searchBox">
                        <div className="searchHeadline">IMDb Movie Search</div>
                        <Row type="flex" justify="center">
                            <Col 
                            span={9}
                            style={{
                                textAlign: "center", 
                                borderBottom: "1px white solid",
                                margin: 10}}>By Title</Col>
                        </Row>
                        <Row>
                            <Col className="searchLine" span={24}>
                                <span style={{marginRight: 5}}> Title: </span>
                                <Input
                                    type="text"
                                    placeholder="Jaws" 
                                    style={{width: 200}}
                                    name="queryTitle"
                                    value={this.state.queryTitle}
                                    onChange={this.handleChange}>
                                </Input>
                                <span style={{marginRight: 5, marginLeft: 15}}>Year: </span>
                                <Input
                                    type="text"
                                    placeholder="1975" 
                                    style={{width:100}}
                                    name="queryYear"
                                    value={this.state.queryYear}
                                    onChange={this.handleChange}>
                                </Input>
                                <Button
                                type="primary" 
                                icon="search" 
                                style={{margin: 10}}
                                loading={this.state.iconLoadingTitle}
                                onClick={this.searchByYear}>
                                </Button>
                            </Col>                     
                        </Row>
                        <Row type="flex" justify="center">
                            <Col 
                            span={9}
                            style={{
                                textAlign: "center", 
                                borderBottom: "1px white solid",
                                margin: 10}}>By ID</Col>
                        </Row>
                        <Row>
                            <Col className="searchLine" span={24}>
                                <span style={{marginRight: 5}}> IMDb ID: </span>
                                <Input
                                    placeholder="tt0073195" 
                                    style={{width: 200}}
                                    name="queryID"
                                    value={this.state.queryID}
                                    onChange={this.handleChange}>
                                </Input>
                                <Button
                                type="primary" 
                                icon="search" 
                                style={{margin: 10}}
                                loading={this.state.iconLoadingID}
                                onClick={this.searchByID}>
                                </Button>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col
                                span={20}
                                style={{ 
                                minHeight: 40,
                                marginBottom: 20,
                                textAlign: "center"}}>
                                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                                    {json.map(movie=><MovieCard key={movie.Poster} newRequest={this.newRequest} movie={movie}/>)}
                                </div>
                                {/* {this.state.searchResponse.map(movie => <MovieCard key={movie.Poster} movie={movie}/>)} */}
                            </Col>
                    </Row>
                    </Col>
                </Row>

   

            </div>

        )
    }
}

export default AddMovie;