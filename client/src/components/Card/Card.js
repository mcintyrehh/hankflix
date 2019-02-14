import { Col, Button, notification } from 'antd';
import './Card.css'
import React, { Component } from 'react';
import API from '../../utils/API';
import { Collection } from 'mongoose';
// import { Link } from 'react-router-dom';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      overview: '',
      year: '',
      yearOnly: '',
      src: '',
      tmdbID: <Button shape="circle" loading />,
      monitored: <Button shape="circle" loading />,
      downloaded: <Button shape="circle" loading />,
      imdbID: ''
    }
  }
  createRequest = () => {
    const req = {
      title: this.state.title,
      imdb_id: this.state.imdbID,
      poster_url: this.state.src,
    }
    this.props.newRequest(req);
    this.setState({monitored: 'true'})
    
    notification.open({
      message: '🧐Movie Monitored!👌',
      description: `${this.state.title} (${this.state.yearOnly}) is now being monitored, if available it will begin downloading shortly!`,
      duration: 6
    })
  }
  componentDidMount = (props) => {
    this.setState({ title: this.props.movie.title,
                    overview: this.props.movie.overview,
                    year: this.props.movie.release_date,
                    yearOnly: this.props.movie.release_date.substring(0,4),
                    src: `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`,
                    tmdbID: this.props.movie.id });
    API.getID(this.props.movie.id)
      .then(res => {
        // console.log(res.data.imdb_id)
        const imdb_id = res.data.imdb_id;
        this.setState({ imdbID: imdb_id})

// This sents a get request to /api/movies/:id using  the imdbID from the function above
// this is routed to movieController.checkStatus, which checks the ID against the Radarr Collection
// * if matched it returns the match and monitored/downloaded states are set from those values
// * if no match, monitored: "false", downloaded: "false" is returned 
      API.getRequest(imdb_id)
        .then(res => {
            const movie = res.data
            this.setState({monitored: movie.monitored})
            this.setState({ downloaded: movie.downloaded})
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Col span={18} className="movieCard" style={{ margin: 5, borderRadius: 10, borderBottom: "2px white solid", borderRight: "2px white solid" }}>
        <div className="card movieCard">
          <Col span={8} className="movieCard">
            <img alt={`pic for ${this.state.title}`} src={(this.state.src !== "https://image.tmdb.org/t/p/w500null" )? this.state.src : "/images/default.png"}/>
          </Col>
          <Col span={16} className="movieCard">
            <div className="overlay">
              <div className="title">{this.state.title}</div>
              <div className="year">{this.state.year}</div>
              <div className="id">IMDb ID: {this.state.imdbID}</div>
              <div className="plot">{this.state.overview}</div>
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
