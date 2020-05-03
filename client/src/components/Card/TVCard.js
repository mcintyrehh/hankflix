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
    const seriesProp = this.props.series.seasons
    const seasonsArray = [{
      seasonNumber: 0,
      monitored: false
    }];
    for (let i=1; i<seriesProp.length; i++) {
      if (seriesProp[i].seasonNumber.toString() === "0" ) {
        return;
      }
      else {
        seasonsArray.push({
          seasonNumber: i,
          monitored: true
        })        
      }
    }
    console.log(seasonsArray)
    const sonarrPostData = {
      tvdbId: show.tvdbId,
      title: show.title,
      qualityProfileId: 1,
      titleSlug: show.titleSlug,
      images: show.images,
      seasons: seasonsArray,
      path: `/media/${show.title}`,
      seasonFolder: true,
      monitored: true,
      addOptions: {
        searchForMissingEpisodes: true
      }
    }
    API.sonarrPost(sonarrPostData)
    .then(res => {
      console.log(res.data)
      this.checkSeries(res.data.tvdbId)
      this.setState({monitored: res.data.monitored.toString()})
      })
    .catch(err => console.log(err));
    //updates UI to say monitored
    this.setState({monitored: true})
    //refreshes season data
    this.checkSeries(show.tvdbID);
    notification.open({
      message: '🧐TV Series Monitored!👌',
      description: `${show.title} (${show.year}) is now being monitored, if available it will begin downloading shortly!`,
      duration: 6
    })
  }
  checkSeries = (tvdbId) => {
    API.checkSeries(this.props.series.tvdbId)
      .then(response => {
        if(!!response.data.added) {
          //this part trims out season '0' seasons that are actually just specials
          const trimmedSeasons = [];
          response.data.seasons.map(season => {
            if (season.seasonNumber !== 0) {
              return trimmedSeasons.push(season);
             
            }
          })
          this.setState({seasonData: trimmedSeasons})
        }
        this.setState({
          monitored: response.data.monitored.toString()
        })
      })
      .catch(err => console.log(err));
  }
  componentDidMount = (props) => {
    this.checkSeries(this.props.series.tvdbId)
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
              {this.state.seasonData.map(season=>
               <div key={season.seasonNumber}>
                <div> Season {season.seasonNumber} : <span style={{color: season.statistics.percentOfEpisodes === 100 ? "green" : "red"}}>{season.statistics.episodeCount }</span>/<span style={{color: season.statistics.percentOfEpisodes === 100 ? "green" : "red"}}>{season.statistics.totalEpisodeCount}</span> eps</div>
               </div>
              )}
              <br/>
              {this.state.monitored === 'false' && (<Button onClick={this.createRequest} style={{marginLeft: 8, marginBottom: 15}}type="primary" icon="cloud-upload">monitor</Button>)}
            </div> 
          </Col>
        </div>
      </Col>

    )
  }
}

export { TVCard };
