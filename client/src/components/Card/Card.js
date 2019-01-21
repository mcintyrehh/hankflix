import { Col, Button } from 'antd';
import './Card.css'
import React, { Component } from 'react';
import API from '../../utils/API';
// import { Link } from 'react-router-dom';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      overview: '',
      year: '',
      src: '',
      tmdbID: '',
      monitored: '',
      downloaded: '',
      imdbID: ''
    }
  }
  favStar = (userId, articleId, articleType) => {
    console.log(articleId);
    console.log(articleType);
    // 'fas' is a font awesome icon of a solid star, 'far' is a hollow star
    // on clicking the star, the ternary operator switches states to the opposite
    this.props.saved(userId, articleId, articleType)
    const updateFav = (this.state.favIcon === 'fas') ? 'far' : 'fas';
    this.setState({favIcon : updateFav});
  }
  createRequest = () => {
    const req = {
      title: this.state.title,
      imdbID: this.state.imdbID,
      URL: this.state.src,
    }
    this.props.newRequest(req);
  }
  componentDidMount = (props) => {
    this.setState({ title: this.props.movie.title,
                    overview: this.props.movie.overview,
                    year: this.props.movie.release_date,
                    src: `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`,
                    tmdbID: this.props.movie.id });
    API.getID(this.props.movie.id)
      .then(res => {
        const imdb_id = res.data.imdb_id;
        this.setState({ imdbID: imdb_id})
        API.checkID(imdb_id)
        .then(res => {
          if (res.data.length > 0) {
            this.setState({monitored: res.data[0].monitored})
            this.setState({ downloaded: res.data[0].downloaded})
            console.log(res.data);
          }
          else {
            this.setState({ 
              monitored: 'false',
              downloaded: 'false'})
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Col span={18} style={{ margin: 5, borderRadius: 10, border: "1px red solid" }}>
        <div className="card">
          <Col span={8}>
            <img alt={`pic for ${this.state.title}`} src={(this.state.src !== "https://image.tmdb.org/t/p/w500null" )? this.state.src : "/images/default.png"}/>
          </Col>
          <Col span={16}>
            <div className="overlay">
              <div className="title">{this.state.title}</div>
              <div className="year">{this.state.year}</div>
              <div className="id">IMDb ID: {this.state.imdbID}</div>
              <div className="plot">{this.state.overview}</div>
              {/* ternary operators to set the css color based on whether they are downloaded or not */}
              <div>Currently monitored by server: <span style={{color: this.state.monitored === "true" ? "green" : "red"}}>{this.state.monitored}</span></div>
              <div>Downloaded: <span style={{color: this.state.monitored === "true" ? "green" : "red"}}>{this.state.downloaded}</span></div>
              <Button onClick={this.createRequest} style={{marginLeft: 8}}type="primary" icon="cloud-upload"></Button>
            </div> 
          </Col>

        </div>
      </Col>

    )
  }
}

export { MovieCard };
