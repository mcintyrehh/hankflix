import React, { Component } from 'react';
import { Col, Row, Input } from 'antd';
import API from "../../utils/API";
// import axios from 'axios';
import './AddTelevision.css';
// import { MovieCard } from '../Card'

// const Search = Input.Search;
const json = require('./data.json');
const Search = Input.Search;
class AddTelevision extends Component {
    constructor() {
        super();
        this.state = {
            queryTitle: '',
            iconLoadingTitle: "false",
            searchResponse: [],
            tvdbAuthToken: ''
        }
    }
    componentDidMount = () => {
        this.setState({searchResponse: json})
        console.log("in tv");
        API.tvdbLogin()
        .then((res, err) => {
            if(err) {console.log(err)}
            else {
                console.log(res.data);
                const token = res.data.token;
                this.setState({ tvdbAuthToken: token})
            }
        })
        const obj = {
            id: "space",
            token: this.state.tvdbAuthToken
        }
        API.tvdbSearch(obj)
        .then(function(res, err) {
            if(err) {console.log(err)}
            else {console.log(res.data)}
        })
        // on loading /television, a get request to /api/television/collection returns all monitored shows
        API.getTVCollection()
        .then(function(res, err) {
            // console.log(res)
          })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    searchByTitle = () => {
        this.setState({ iconLoadingTitle: "true" })
        console.log(`Title: ${this.state.queryTitle} Year: ${this.state.queryYear}`) 
        const query = this.state.queryTitle;
        API.search(query)
            .then(response => {
                console.log(response.data.results);
                const queryData = response.data.results;
                this.setState({ searchResponse: queryData });
                this.setState({ iconLoadingTitle: "false" });

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
                            onSearch={this.searchByYear}>
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
                            {/* {this.state.searchResponse.map(movie=><MovieCard key={movie.id} newRequest={this.newRequest} movie={movie}/>)} */}
                        </div>
                        {/* {this.state.searchResponse.map(movie => <MovieCard key={movie.Poster} movie={movie}/>)} */}
                    </Col>
                </Row>
            </Col>
            //     </Row>
            // </div>

        )
    }
}

export default AddTelevision;