import React, { Component, View} from 'react';
import '../admin.css';
import axios from "axios";
import googlemaps_ico from '../../img/google_maps.png';
import Moment from 'moment';
import Skeleton, {SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

var textColor = "#4a4a4a";
var title_event_color = "#fc941c";

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const options2 = { year: 'numeric', month: 'numeric', day: 'numeric' };

class Home extends Component {
  constructor() {
    super();
    this.state = {
      matchesH: [],
      matchesE: [],
      gamedaysH: [],
      gamedaysE: [],
      loading: true
    };
  }

  componentWillMount() {
    this.getMatchesH();
    this.getMatchesE();
    this.getUpcomingH();
    this.getUpcomingE();
  };

  getMatchesH() {
    axios.get(`https://rolstoelhockey-backend.herokuapp.com/matches/findlatest/H`).then(response => {
      console.log(response);
        this.setState({ matchesH: response.data, loading: false });
      })
  }

  getMatchesE() {
    axios.get(`https://rolstoelhockey-backend.herokuapp.com/matches/findlatest/E`).then(response => {
      console.log(response);
      this.setState({ matchesE: response.data, loading: false });
    });
  }

  getUpcomingH() {
    axios.get(`https://rolstoelhockey-backend.herokuapp.com/gamedays/upcoming/H`).then(response => {
      this.setState({ gamedaysH: response.data, loading: false });
    });
  }
  getUpcomingE() {
    axios.get(`https://rolstoelhockey-backend.herokuapp.com/gamedays/upcoming/E`).then(response => {
      this.setState({ gamedaysE: response.data, loading: false });
    });
  }

  render() {
    const matchItemsH = this.state.matchesH.map((match, _id) => {
      let game_date = new Date(match.gameday_info.gamedate).toLocaleDateString('nl-NL', options2);
        return (
          <div className="match-group">
            <div className="match-time-date">
              <div className="match-time">{match.played_at}</div>
              <div className="match-date">{game_date}</div>
            </div>
            <div className="match-teama">{match.teamA}</div>
            <div className="match-score">{match.scoreA}</div>
            <div className="match-score"> - </div>
            <div className="match-score">{match.scoreB}</div>
            <div className="match-teamb">{match.teamB}</div>
          </div>
        );
      }
    );

    const matchItemsE = this.state.matchesE.map((match, _id) => {
      let game_date = new Date(match.gameday_info.gamedate).toLocaleDateString('nl-NL', options2);
        return (
          <div className="match-group">
            <div className="match-time-date">
              <div className="match-time">{match.played_at}</div>
              <div className="match-date">{game_date}</div>
            </div>
            <div className="match-teama">{match.teamA}</div>
            <div className="match-score">{match.scoreA}</div>
            <div className="match-score"> - </div>
            <div className="match-score">{match.scoreB}</div>
            <div className="match-teamb">{match.teamB}</div>
          </div>
        );
      }
    );

    const eventItemsH = this.state.gamedaysH.map((day, id) => {
      let game_date = new Date(day.gamedate).toLocaleDateString('nl-NL', options)
      let locationurl = "https://maps.google.com/?q=" + day.address + ", " + day.city
      let address = ""
      let city = ""

      if (day.address === null || day.address === "") {
        address = "Unknown"
        city = "Unknown"
      }
      else {
        address = day.address
        city = day.city
      }

      return (
        <div>
          <div className="event">
            <div className="event-mid">
              <div style={{ width: '100%', margin: '5px' }}><b style={{ color: title_event_color, fontWeight: '400' }}>{day.title}</b></div>
              <div style={{ width: '100%', margin: '5px' }}><b style={{ color: textColor, fontWeight: '300' }}>Datum: </b><br />{game_date}</div>
              <div style={{ width: '100%', margin: '5px' }}><b style={{ color: textColor, fontWeight: '300' }}>Adres: </b><br />{address}</div>
              <div style={{ width: '100%', margin: '5px', marginBottom: '15px' }}><b style={{ color: textColor, fontWeight: '300' }}>Stad: </b><br />{city}</div>
              <a className='button' href={locationurl}>Navigeer</a>
            </div>
          </div>
        </div>
      );
    });

    const eventItemsE = this.state.gamedaysE.map((day, id) => {
      let game_date = new Date(day.gamedate).toLocaleDateString('nl-NL', options)
      let locationurl = "https://maps.google.com/?q=" + day.address + ", " + day.city
      let address = ""
      let city = ""

      if (day.address === null || day.address === "") {
        address = "Unknown"
        city = "Unknown"
      }
      else {
        address = day.address
        city = day.city
      }

      return (
        <div>
          <div className="event">
            <div className="event-mid">
              <div style={{ width: '100%', margin: '5px' }}><b style={{ color: title_event_color, fontWeight: '400' }}>{day.title}</b></div>
              <div style={{ width: '100%', margin: '5px' }}><b style={{ color: textColor, fontWeight: '300' }}>Datum: </b><br />{game_date}</div>
              <div style={{ width: '100%', margin: '5px' }}><b style={{ color: textColor, fontWeight: '300' }}>Adres: </b><br />{address}</div>
              <div style={{ width: '100%', margin: '5px', marginBottom: '15px' }}><b style={{ color: textColor, fontWeight: '300' }}>Stad: </b><br />{city}</div>
              <a className='button' href={locationurl}>Navigeer</a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="pageblock">
        <div className="home-div1">
          <div className="home-matches">
            <h1 style={{ fontWeight: '600', fontSize: 26, margin: 7}}>Laatste uitslagen - H</h1>
            {this.state.loading && (
                  <div>
                    <Skeleton style={{margin:"0.5rem"}} height={39} count={20}></Skeleton>
                  </div>
           )}
            {matchItemsH}
          </div>
          <div className="home-matches">
            <h1 style={{ fontWeight: '600', fontSize: 26, margin: 7}}>Laatste uitslagen - E</h1>
            {this.state.loading && (
                  <div>
                    <Skeleton style={{margin:"0.5rem"}} height={39} count={20}></Skeleton>
                  </div>
           )}
            {matchItemsE}
          </div>
        </div>
        <div className="home-div1">
        <div className="home-events">
            <h1 style={{ fontWeight: '600', fontSize: 26, margin: 7}}>Competitedagen - H</h1>
            {this.state.loading && (
                  <div>
                    <Skeleton style={{margin:"0.5rem"}} height={39} count={20}></Skeleton>
                  </div>
           )}
              {eventItemsH}
          </div>
          <div className="home-events">
            <h1 style={{ fontWeight: '600', fontSize: 26, margin: 7}}>Competitedagen - E</h1>
            {this.state.loading && (
                  <div>
                    <Skeleton style={{margin:"0.5rem"}} height={39} count={20}></Skeleton>
                  </div>
           )}
              {eventItemsE}
          </div>
        </div>
      </div>
    )
  }
}

export default Home;