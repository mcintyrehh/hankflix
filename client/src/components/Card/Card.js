import { Row, Col, Button } from 'antd';
import './Card.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: "hide"
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
  hover = () => {
    this.setState({hoverState: "show"})
  }
  

  render() {
    return (
      <Col span={8} onMouseEnter={this.hover} className="card">
        <div className="">
          <img alt={`pic for "${this.props.movie.Title}" article`} src={this.props.movie.Poster}></img>
        </div>
        <div onMouseEnter={this.hover} hide>TEST</div>
      </Col>
    )
  }
}

export { Card };
