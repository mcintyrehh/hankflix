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
            tvdbAuthToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTA4OTQ0NTEsImlkIjoiIiwib3JpZ19pYXQiOjE1NTA4MDgwNTEsInVzZXJpZCI6NTIwNTEwLCJ1c2VybmFtZSI6Im1jaW50eXJlaGhwZTgifQ.eMCtp7hqgRDG4ytpMh1FysEGwe5iqG3GkbSToXJ5QwjTdNBv0EHaxGF6LmBKSrihYhf8ZZZO1RF5lOXKUvs4ky1ugavqSt7Upylud9wbggWW-K8q-wOMu9bOLnlTTkt5-vOU84xZ4iyDywn5BUJBl7xui--nELr2dutuaVRwIZZu4gHGiur9IWkffWVwsFyqREHJMImvqwnA8INqQwB1m87rbnq-mvU-yfteqkWlPfm6UmpaQtx828C5GnBvvPjfIXPDD9Ci6sVuT0aHvhoCCI2diOhDneO64r2EnVpSYZHav4609XgMwNpgY5HC0VZB2Nyset-V5J1MdzT_EDxVxA',
            loggedIn: 'false'
        }
    }
    componentDidMount = () => {
        // this.setState({searchResponse: json})
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
        console.log(`Title: ${this.state.queryTitle}`) 
        const query = this.state.queryTitle;
        const token = this.state.tvdbAuthToken;
        API.tvdbSearch(query, token)
        .then((res, err) => {
            if (err) {console.log(err)}
            else {
                console.log(res.data.data);
                const searchResponse = res.data
                this.setState({ searchResponse: searchResponse})
            }
        })
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