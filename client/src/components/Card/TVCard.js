import { Col, Button, notification } from 'antd';
import './Card.css'
import React, { Component } from 'react';
import API from '../../utils/API';

class TVCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvdbID: <Button shape="circle" loading />,
      monitored: <Button shape="circle" loading />,
      seasonData: []
    }
  }
  createRequest = () => {
    const show = this.props.series;
    const req = {
      title: show.title,
      imdb_id: show.tmdbId,
      poster_url: show.remotePoster,
    }
    const radarrPostData = {
      title: show.title,
      qualityProfileId: 1,
      titleSlug: show.titleSlug,
      images: show.images,
      tmdbId: show.tmdbId,
      year: show.year,
      path:  `/media/${show.title}`,
      monitored: true,
      addOptions: {
        searchForMovie: true
      }   
    }
    API.newSeriesRequest(req)
    .then(res => {
      console.log("test")
      console.log(res);
      })
    .catch(err => console.log(err));

    API.radarrPost(radarrPostData)
    .then(res => {
      console.log(res.data)
      this.setState({monitored: res.data.monitored.toString()})
      this.setState({ downloaded: res.data.downloaded.toString()})
      })
    .catch(err => console.log(err));
  
    notification.open({
      message: '🧐Movie Monitored!👌',
      description: `${show.title} (${show.year}) is now being monitored, if available it will begin downloading shortly!`,
      duration: 6
    })
  }
  componentDidMount = (props) => {
    API.checkSeries(this.props.series.tvdbId)
      .then(response => {
        if(!!response.data.added) {
          this.setState({seasonData: response.data.seasons})
        }
        this.setState({
          monitored: response.data.monitored.toString()
        })
      })
      .catch(err => console.log(err));
    this.setState({ 
      // monitored: this.props.series.monitored.toString()
    })
  }

  render() {
    const show = this.props.series;
    return (
      <Col span={18} className="movieCard" style={{ margin: 5, borderRadius: 10, borderBottom: "2px white solid", borderRight: "2px white solid" }}>
        <div className="card movieCard">
          <Col span={8} className="movieCard">
            <img alt={`pic for ${show.title}`} src={(!!show.remotePoster )? show.remotePoster : "/images/default.png"}/>
          </Col>
          <Col span={16} className="movieCard">
            <div className="overlay">
              <div className="title">{show.title}</div>
              <div className="year">{show.year}</div>
              <div className="plot">{show.overview}</div>
              {/* ternary operators to set the css color based on whether they are downloaded or not */}
              <div>Currently monitored by server: <span style={{color: this.state.monitored === "true" ? "green" : "red"}}>{this.state.monitored}</span></div>
              {this.state.seasonData.length !== 0 && (<span style={{borderBottom: "1px solid white"}}>Seasons</span>)}
              <br/>
              {/* this 'slice(1)' skips the first index of season 0, which is just all the specials for a series */}
              {this.state.seasonData.slice(1).map(season=>
               <div key={season.seasonNumber}>
                <div> Season {season.seasonNumber} : <span style={{color: season.statistics.percentOfEpisodes === 100 ? "green" : "red"}}>{season.statistics.episodeCount }</span>/<span style={{color: season.statistics.percentOfEpisodes === 100 ? "green" : "red"}}>{season.statistics.totalEpisodeCount}</span> eps</div>
               </div>
              )}
              <br/>
              {this.state.monitored === 'false' && (<Button onClick={this.createRequest} style={{marginLeft: 8}}type="primary" icon="cloud-upload">monitor</Button>)}
            </div> 
          </Col>
        </div>
      </Col>

    )
  }
}

export { TVCard };
