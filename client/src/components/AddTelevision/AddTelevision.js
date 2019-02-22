import React, { Component } from 'react';
import { Col, Row, Input } from 'antd';
import API from "../../utils/API";
// import axios from 'axios';
// import axios from 'axios';
import './AddTelevision.css';
// import { MovieCard } from '../Card'

// const Search = Input.Search;
// const json = require('./data.json');
const Search = Input.Search;
class AddTelevision extends Component {
    constructor() {
        super();
        this.state = {
            queryTitle: '',
            iconLoadingTitle: "false",
            searchResponse: [],
            loggedIn: 'false'
        }
    }
    componentDidMount = () => {
        // this.setState({searchResponse: json})
        console.log("in tv");
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
        if (!!this.state.queryTitle) {
            this.setState({ iconLoadingTitle: "true" })
            console.log(`Title: ${this.state.queryTitle}`) 
            const query = this.state.queryTitle;
            API.tvdbSearch(query)
            .then((res, err) => {
                if (err) {console.log(err)}
                else {
                    console.log(res.data);
                    const searchResponse = res.data
                    this.setState({ searchResponse: searchResponse})
                }
            })
        }
        else { return }
    }
    render() {
        return (
            <Col md={16} sm={24} className="searchBox">
                <div className="searchHeadline">TBDb Series Search</div>
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
                            placeholder="Broad City" 
                            enterButton
                            allowClear
                            name="queryTitle"
                            value={this.state.queryTitle}
                            onChange={this.handleChange}
                            loading={this.state.iconLoadingTitle}
                            onSearch={this.searchByTitle}>
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