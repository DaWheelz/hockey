import React, { Component } from "react";
import axios from "axios";
import './match.css';
import '../../admin.css'
import { red } from "@material-ui/core/colors";

var bgColors = {
  "Default": "#81b71a",
  "Button-Color": "#ef790c"
};

const options2 = { year: 'numeric', month: 'numeric', day: 'numeric' };

class MatchByTeam extends Component {
  constructor() {
    super();
    this.state = {
      matches: [],
      gamedays: [],
      teams: [],
      selectedTeam: "",
      validationError: "",
      loggedIn: false,
      selectChanged: false,
      role: '',
    };
  }
  componentWillMount() {
    this.getAcces();
    this.getTeams();
  };

  getMatches(team) {
    axios.get(`https://rolstoelhockey-backend.herokuapp.com/matches/findmatchByTeam/` + team).then(response => {
      this.setState({ matches: response.data });
    });
  }

  getTeams() {
    fetch(`https://rolstoelhockey-backend.herokuapp.com/clubs/find/teams/H`).then(response => {
        return response.json();
      }).then(data => {
        let teamsFromApi = data.map(team => {
            return { value: team.teamname, display: team.teamname};
          });
      this.setState({ 
          teams: [
              {
                  value: 1,
                  display: "--H-Hockey--", 
                  style : {
                    fontWeight: '600',
                    color: '#ff7b00'
                  }
                }
            ].concat(teamsFromApi)
        });
        fetch(`https://rolstoelhockey-backend.herokuapp.com/clubs/find/teams/E`).then(response => {
            return response.json();
          })
            .then(data => {
                let teamsFromApi = data.map(team => {
                    return { value: team.teamname, display: team.teamname};
                  });
              this.setState({ 
                  teams: [...this.state.teams,
                      {
                          value: 1,
                          display: "--E-Hockey--", 
                          style : {
                            fontWeight: '600',
                            color: '#ff7b00'
                          }
                        }
                    ].concat(teamsFromApi)
                });
        });
        })
    };

  getAcces() {
    this.state.role = sessionStorage.getItem('role');
  }

  render() {
    const matchItems = this.state.matches.map((match, _id) => {
    let game_date = new Date(match.gameday_info.gamedate).toLocaleDateString('nl-NL', options2);
        return (
            <div className="match-group">
              <div className="match-date">{game_date}</div>
              <div className="match-time">{match.played_at}</div>
              <div className="match-teama">{match.teamA}</div>
              <div className="match-score">{match.scoreA}</div>
              <div className="match-score"> : </div>
              <div className="match-score">{match.scoreB}</div>
              <div className="match-teamb">{match.teamB}</div>
            </div>
        );
      });

    return (
      <div style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
        <div className="search-bar">
          <h4 style={{ width: '50%', fontWeight: '600' }}>Zoek wedstrijden per team</h4>
          <div style={{ display: 'flex' }}>
            <select className="custom-select" value={this.state.selectedTeam} onChange={(e) => { this.getMatches(e.target.value); this.setState({ selectChanged: true, selectedTeam: e.target.display }); }}>
              {this.state.teams.map(team => (
                <option
                  key={team.value}
                  value={team.value}
                  style={team.style}
                >
                  {team.display}
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

export default MatchByTeam;
