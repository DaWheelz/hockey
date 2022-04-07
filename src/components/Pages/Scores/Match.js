import React, { Component } from "react";
import axios from "axios";
import './match.css';
import '../../admin.css'

var bgColors = {
  "Default": "#81b71a",
  "Button-Color": "#ef790c"
};

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
    if (localStorage.getItem('token')) {
      this.setState({ loggedIn: true })
    }
    this.setState({ role: localStorage.getItem('role') })
  };

  getMatches(gamedayid) {
    console.log(gamedayid);
    axios.get(`https://rolstoelhockey-backend.herokuapp.com/matches/find/` + gamedayid).then(response => {
      this.setState({ matches: response.data });
    });
  }
  getGameDays() {
    fetch("https://rolstoelhockey-backend.herokuapp.com/gamedays/upcoming/H").then(response => {
      return response.json();
    })
      .then(data => {
        let gamedaysFromApi = data.map(gameday => {
          return { value: gameday._id, display: gameday.title };
        });
        this.setState({
          gamedays: [
            {
              value: 1,
              display:
                "Selecteer een competitiedag"
            }
          ].concat(gamedaysFromApi)
        });
      })
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
          <h2 style={{ width: '20%', fontWeight: '100' }}>Alle wedstrijden</h2>
          <div style={{ display: 'flex' }}>
            <select className="custom-select" value={this.state.selectedGameDay} onChange={(e) => { this.setState({ selectedGameDay: e.target.value, selectChanged: true }); }}>
              {this.state.gamedays.map(gameday => (
                <option
                  key={gameday.value}
                  value={gameday.value}
                >
                  {gameday.display}
                </option>
              ))}
            </select>
            {this.state.selectChanged
              ?
              <button type="submit" style={{ backgroundColor: bgColors["Button-Color"], color: 'white' }} class="fa fa-search search-button" onClick={() => { this.getMatches(this.state.selectedGameDay);}}></button>
              : null}
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
