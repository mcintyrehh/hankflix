import { Col, Button, notification } from 'antd';
import './Card.css'
import React, { Component } from 'react';
import API from '../../utils/API';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmdbID: <Button shape="circle" loading />,
      monitored: <Button shape="circle" loading />,
      downloaded: <Button shape="circle" loading />,
      movieObject: {}
    }
  }
  createRequest = () => {
    const req = {
      title: this.state.movieObject.title,
      imdb_id: this.state.movieObject.tmdbId,
      poster_url: this.state.movieObject.remotePoster,
    }
    const radarrPostData = {
      title: this.state.movieObject.title,
      qualityProfileId: 1,
      titleSlug: this.state.movieObject.titleSlug,
      images: this.state.movieObject.images,
      tmdbId: this.state.movieObject.tmdbId,
      year: this.state.movieObject.year,
      path:  `/media/${this.state.movieObject.title}`,
      monitored: true,
      addOptions: {
        searchForMovie: true
      }   
    }
    API.newRequest(req)
    .then(res => {
      console.log("test")
      console.log(res);
      })
    .catch(err => console.log(err));

    API.radarrPost(radarrPostData)
    .then(res => {
      this.setState({monitored: res.data.monitored.toString()})
      this.setState({ downloaded: res.data.downloaded.toString()})
      })
    .catch(err => console.log(err));
  
    notification.open({
      message: '🧐Movie Monitored!👌',
      description: `${this.state.movieObject.title} (${this.state.movieObject.year}) is now being monitored, if available it will begin downloading shortly!`,
      duration: 5
    })
    this.setState({monitored: 'true'})
  }
  componentDidMount = (props) => {
    this.setState({ movieObject: this.props.movie })
    // this is routed to movieController.checkStatus, which checks the ID against the Radarr Collection
    // * if matched it returns the match and monitored/downloaded states are set from those values
    // * if no match, monitored: "false", downloaded: "false" is returned 
    API.checkStatus(this.props.movie.tmdbId)
      .then(res => {
          const movie = res.data
          this.setState({monitored: movie.monitored})
          this.setState({ downloaded: movie.downloaded})
      })
      .catch(err => console.log(err));
  };
  addDefaultImgSrc(event){
    event.target.src='/images/default.png';
  };
  render() {
    return (
      <Col span={18} className="movieCard" style={{ margin: 5, borderRadius: 10, borderBottom: "2px white solid", borderRight: "2px white solid" }}>
        <div className="card movieCard">
          <Col span={8} className="movieCard">
          <img 
            alt={`pic for ${this.state.movieObject.title}`}
             
            src={this.state.movieObject.remotePoster ? this.state.movieObject.remotePoster : "/images/default.png"}
            onError={this.addDefaultImgSrc}/> 
          </Col>
          <Col span={16} className="movieCard">
            <div className="overlay">
              <div className="title">{this.state.movieObject.title}</div>
              <div className="year">{this.state.movieObject.year}</div>
              {/* <div className="id">IMDb ID: {this.state.movieObject.imdbID}</div> */}
              <div className="plot">{this.state.movieObject.overview}</div>
              {/* ternary operators to set the css color based on whether they are downloaded or not */}
              <div>Currently monitored by server: <span style={{color: this.state.monitored === "true" ? "green" : "red"}}>{this.state.monitored}</span></div>
              <div>Downloaded: <span style={{color: this.state.downloaded === "true" ? "green" : "red"}}>{this.state.downloaded}</span></div>
              {this.state.monitored === 'false' && (<Button onClick={this.createRequest} style={{marginLeft: 8}}type="primary" icon="cloud-upload">monitor</Button>)}
            </div> 
          </Col>
        </div>
      </Col>

    )
  }
}

export { MovieCard };
