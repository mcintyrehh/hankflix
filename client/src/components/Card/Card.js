import { Col, Button, notification } from 'antd';
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
      description: `${this.state.title} (${this.state.yearOnly}) is now being monitored, if available it will begin downloading shortly!`
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
        const imdb_id = res.data.imdb_id;
        this.setState({ imdbID: imdb_id})
        API.checkID(imdb_id)
        .then(res => {
          if (res.data.length > 0) {
            const movie = res.data[0]
            this.setState({monitored: movie.monitored})
            this.setState({ downloaded: movie.downloaded})
            // this.setState({ year: movie.year})
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
      <Col span={18} style={{ margin: 5, borderRadius: 10, borderBottom: "2px white solid", borderRight: "2px white solid" }}>
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
