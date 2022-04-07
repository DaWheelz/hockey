import React, { Component, View} from 'react';
import '../admin.css';
import axios from "axios";
import googlemaps_ico from '../../img/google_maps.png';

var textColor = "#4a4a4a";
var title_event_color = "#fc941c";

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class Home extends Component {
  constructor() {
    super();
    this.state = {
      matches: [],
      gamedays: [],
      role: '',
    };
  }

  componentWillMount() {
    this.test();
    this.getMatches();
    this.getUpcoming();
    this.setState({ role: localStorage.getItem('role') })
  };

  test() {
    axios.get('http://postman-echo.com/get?foo1=bar1&foo2=bar2',
      {
        headers: { 
          'Access-Control-Allow-Origin': '*'
        }
      }
    ).then(response => {
      console.log(response);
    })
  }

  getMatches() {
    axios.get(`http://hockey.mutsaers.nu:5000/matches/findlatest/H`).then(response => {
      console.log(response);
      this.setState({ matches: response.data });
    });
  }

  getUpcoming() {
    axios.get(`http://hockey.mutsaers.nu:5000/gamedays/upcoming/H`).then(response => {
      this.setState({ gamedays: response.data });
    });
  }

  render() {
    const matchItems = this.state.matches.map((match, _id) => {
      if (this.state.role === 'referee' || this.state.role === 'admin') {
        return (
          <a href={`/editmatch/?matchid=${match._id}`} style={{}}>
            <div className="match-group">
              <div className="match-time">{match.played_at}</div>
              <div className="match-teama">{match.teamA}</div>
              <div className="match-score">{match.scoreA}</div>
              <div> - </div>
              <div className="match-score">{match.scoreB}</div>
              <div className="match-teamb">{match.teamB}</div>
            </div>
          </a>
        );
      } else {
        return (
          <div className="match-group">
            <div className="match-time">{match.played_at}</div>
            <div className="match-teama">{match.teamA}</div>
            <div className="match-score">{match.scoreA}</div>
            <div className="match-score"> - </div>
            <div className="match-score">{match.scoreB}</div>
            <div className="match-teamb">{match.teamB}</div>
          </div>
        );
      }
    });

    const eventItems = this.state.gamedays.map((day, id) => {
      let game_date = new Date(day.gamedate).toLocaleDateString('nl-NL', options)
      let locationurl = "httpss://maps.google.com/?q=" + day.address + ", " + day.city
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
              <div style={{ width: '100%', margin: '5px' }}><b style={{ color: textColor, fontWeight: '300' }}>Stad: </b><br />{city}</div>
              <a href={locationurl}><img alt="" className="googlemaps-icon" src={googlemaps_ico} /></a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="pageblock">
        <div className="home-div1">
          <div className="home-matches" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
            <h1 style={{ fontWeight: '500', fontSize: 35, margin: 7}}>Laatste uitslagen!</h1>
            <div>
              {matchItems}
            </div>
          </div>
          <div className="home-events" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)', height: '100%' }}>
            <h1 style={{ color: textColor, fontWeight: '100' }}>Opkomende competitedagen</h1>
            <div>
              {eventItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;