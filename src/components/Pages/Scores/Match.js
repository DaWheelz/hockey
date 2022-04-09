import React, { Component } from "react";
import axios from "axios";
import './match.css';
import '../../admin.css'
import { red } from "@material-ui/core/colors";

var bgColors = {
  "Default": "#81b71a",
  "Button-Color": "#ef790c"
};

const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

class Match extends Component {
  constructor() {
    super();
    this.state = {
      matches: [],
      gamedays: [],
      selectedGameDay: "",
      validationError: "",
      loggedIn: false,
      selectChanged: false,
      role: '',
    };
  }
  componentWillMount() {
    this.getGameDays();
  };

  getMatches(gamedayid) {
    console.log(gamedayid);
    axios.get(`https://rolstoelhockey-backend.herokuapp.com/matches/find/` + gamedayid).then(response => {
      this.setState({ matches: response.data });
    });
  }
  getGameDays() {
    fetch("https://rolstoelhockey-backend.herokuapp.com/gamedays/get/H").then(response => {
      return response.json();
    })
      .then(data => {
        let gamedaysFromApi = data.map(gameday => {
          let game_date = new Date(gameday.gamedate).toLocaleDateString('nl-NL', options);
          return { value: gameday._id, display: gameday.title + " " + game_date};
        });
        this.setState({
          gamedays: [
            {
              value: 1,
              display:
                "H-Hockey",
              style : {
                fontWeight: '600',
                color: '#ff7b00'
              }
            }
          ].concat(gamedaysFromApi)
        });
        fetch("https://rolstoelhockey-backend.herokuapp.com/gamedays/get/E").then(response => {
      return response.json();
      })
      .then(data => {
        let gamedaysFromApi = data.map(gameday => {
          let game_date = new Date(gameday.gamedate).toLocaleDateString('nl-NL', options);
          return { value: gameday._id, display: gameday.title + " " + game_date };
        });
        this.setState({
          gamedays: [ ...this.state.gamedays,
            {
              value: 2,
              display:
                "E-Hockey",
              style : {
                fontWeight: '600',
                color: '#ff7b00'
              }
            }
          ].concat(gamedaysFromApi)
        });
      })
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
              <div className="match-score"> : </div>
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
            <div className="match-score"> : </div>
            <div className="match-score">{match.scoreB}</div>
            <div className="match-teamb">{match.teamB}</div>
          </div>
        );
      }
    });

    return (
      <div style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
        <div className="search-bar">
          <h2 style={{ width: '20%', fontWeight: '600' }}>Alle wedstrijden</h2>
          <div style={{ display: 'flex' }}>
            <select className="custom-select" value={this.state.selectedGameDay} onChange={(e) => { this.getMatches(e.target.value); this.setState({ selectChanged: true, selectedGameDay: e.target.value }); }}>
              {this.state.gamedays.map(gameday => (
                <option
                  key={gameday.value}
                  value={gameday.value}
                  style={gameday.style}
                >
                  {gameday.display}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ color: "red", marginTop: "5px" }}>
          {this.state.validationError}
        </div>
        <div>
          {matchItems}
        </div>
      </div >
    );
  }
}

export default Match;
