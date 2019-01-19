import { Row, Col, Button, Card } from 'antd';
import './Card.css'
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: "hide",
      title: '',
      year: '',
      src: '',
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
      URL: this.state.src
    }
    this.props.newRequest(req);
  }
  componentDidMount = (props) => {
    this.setState({ title: this.props.movie.Title,
                    year: this.props.movie.Year,
                    src: this.props.movie.Poster,
                    imdbID: this.props.movie.imdbID });
  }

  render() {
    return (
      // <Col span={8} onMouseEnter={this.hover} className="card">
        // <div className="card">
        //   <img className="card-img" src={this.state.src}  alt="test poster"/>
        //   <h5 className="card-title movie-name hide">{this.state.title}</h5>
        //   <p className="card-text movie-year hide">{this.state.year}</p>
        //   <p className="card-text col-small movie-IMDb hide"> IMDb id: {this.state.imdbID}</p>
        //   <button  className="btn btn-success hide add-movie">Add Movie</button>
        // </div>
      // </Col>
      <Col span={6} style={{ margin: 5, borderRadius: 10 }}>
        <div className="card">
          <img alt={`pic for ${this.state.title}`} src={(this.state.src !== "N/A" )? this.state.src : "/images/default.png"}/>
          <div className="overlay">
            <div className="title">{this.state.title}</div>
            <div className="year">{this.state.year}<Button onClick={this.createRequest} style={{marginLeft: 8}}type="primary" icon="cloud-upload"></Button></div>
            <div className="id">IMDb ID: {this.state.imdbID}</div>
            <div className="plot">{this.state.plot}</div>
          </div> 
        </div>
      </Col>

    )
  }
}

export { MovieCard };
