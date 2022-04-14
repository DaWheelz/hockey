import React, { Component } from 'react'
import "./addmatch.css";
import axios from 'axios';
import '../../admin.css'
import { CollectionsOutlined, ThreeDRotationSharp, TurnedInSharp } from '@material-ui/icons';

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ef790c"
};

const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

class AddMatch extends Component {

    constructor(props) {
        super(props);
        this.onChangeScoreA = this.onChangeScoreA.bind(this);
        this.onChangeScoreB = this.onChangeScoreB.bind(this);
        this.onChangeGameDay = this.onChangeGameDay.bind(this);
        this.onChangePlayedAt = this.onChangePlayedAt.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            teamA: '',
            scoreA: 0,
            scoreB: 0,
            teamB: '',
            teams: [],
            gamedays: [],
            gamedayid: 0,
            competition: '',
            played_at: '',
            time_confirmed: false,
            succes_message: false,
        }
        
    }

    componentWillMount() {
        this.getTeams();
        this.getGameDays();
    }

    getGameDays() {
        fetch("https://rolstoelhockey-backend.herokuapp.com/gamedays/get/H").then(response => {
          return response.json();
        })
          .then(data => {
            let gamedaysFromApi = data.map(gameday => {
              let game_date = new Date(gameday.gamedate).toLocaleDateString('nl-NL', options);
              return { value: gameday._id, display: gameday.title + " " + game_date, competition: gameday.competitionid};
            }
            );
            this.setState({
              gamedays: [
                {
                  value: [1, "H"],
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
              return { value: gameday._id, display: gameday.title + " " + game_date, competition: gameday.competitionid };
            });
            this.setState({
              gamedays: [ ...this.state.gamedays,
                {
                  value: [2, "E"],
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
          console.log(JSON.stringify(gamedaysFromApi));
          });
      } 

    getTeams() {
        fetch(`https://rolstoelhockey-backend.herokuapp.com/clubs/find/teams/H`).then(response => {
            return response.json();
          }).then(data => {
            let teamsFromApi = data.map(team => {
                return { value: team._id, display: team.teamname};
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
                        return { value: team._id, display: team.teamname};
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
    onChangeScoreA(e) {
        this.setState({
            scoreA: e.target.value
        })
    }
    onChangeScoreB(e) {
        this.setState({
            scoreB: e.target.value
        })
    }
    onChangeGameDay(e) {
        this.setState({
            gamedayid: e.target.value
        })
    }

    onChangePlayedAt(e) {
        e.preventDefault();
        this.setState({
            time_confirmed: true
        })
        console.log("time: " + this.state.played_at)
    }

    onSubmit(e) {
        e.preventDefault();
        const match = {
            teamA: this.state.teamA,
            teamB: this.state.teamB,
            scoreA: this.state.scoreA,
            scoreB: this.state.scoreB,
            gamedayid: this.state.gamedayid,
            competitionid: this.state.competition,
            played_at: this.state.played_at,
        }
        console.log(match);
        axios.post('https://rolstoelhockey-backend.herokuapp.com/matches/add', match)
            .then(res => {this.setState({succes_message: true})
        console.log(res)});
    }

    render() {
        return (
            <div className="pageblock" style={{ display: 'flex', justifyContent: 'center' }}>
                <div class="text-center border border-light p-5" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
                    <p class="h4 mb-4" style={{ fontWeight: '100' }}>Wedstrijd toevoegen</p>
                        <div className="form-group" >
                            <label>Team: </label>
                            <select className="custom-select" value={this.state.teamA} onChange={(e) => { this.setState({teamA: e.target.value }) }}>
                            {this.state.teams.map(team => (
                                <option
                                key={team._id}
                                value={team._id}
                                style={team.style}
                                >
                                {team.display}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group" >
                            <input type="text"
                                className="form-control"
                                value={this.state.scoreA}
                                onChange={this.onChangeScoreA}>
                            </input>
                        </div>
                        <div className="form-group" >
                            <input type="text"
                                className="form-control"
                                value={this.state.scoreB}
                                onChange={this.onChangeScoreB}>
                            </input>
                        </div>
                        <div className="form-group" >
                            <label>Team: </label>
                            <select className="custom-select" value={this.state.teamB} onChange={(e) => { this.setState({teamB: e.target.value }) }}>
                            {this.state.teams.map(team => (
                                <option
                                key={team._id}
                                value={team._id}
                                style={team.style}
                                >
                                {team.display}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group" style={{ display: 'flex' }}>
                            {this.state.time_confirmed
                                ?
                                <input type="time" className="form-control" onChange={e => { this.setState({ played_at: e.target.value }) }} id="timepicker" style={{ width: '200px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'green' }} min="09:00" max="18:00" placeholder="Tijd:"></input>
                                :
                                <input type="time" className="form-control" onChange={e => { this.setState({ played_at: e.target.value }) }} id="timepicker" style={{ width: '200px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'red' }} min="09:00" max="18:00" placeholder="Tijd:"></input>
                            }

                            <button style={{ backgroundColor: bgColors["Button-Color"], color: 'white', border: 'none', borderRadius: '10px', marginLeft: '10px' }} onClick={this.onChangePlayedAt}>OK</button>
                        </div>
                        <div className="form-group" >
                            <label>Competitiedag: </label>
                            <select className="custom-select" value={this.state.gamedayid} onChange={(e) => { this.setState({ gamedayid: e.target.value[0], competition: e.target.value[1] });}}>
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
                        <button class="btn btn-info btn-block" style={{ backgroundColor: bgColors["Button-Color"], border: 'none' }} onClick={this.onSubmit}>Toevoegen</button>
                        {this.state.succes_message
                            ?
                            <div class="alert alert-success" role="alert">
                                Match added
                            </div>
                            :
                            null}
                </div>
                </div>
        )
    }
}

export default AddMatch;
