import React, { Component } from 'react'
import "./addmatch.css";
import axios from 'axios';
import ImporterAPI from '../Scores/GetGameDaysAPI';
import '../../admin.css'

const API = new ImporterAPI()

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ef790c"
};

class AddMatch extends Component {

    constructor(props) {
        super(props);

        this.onChangeTeamA = this.onChangeTeamA.bind(this);
        this.onChangeTeamB = this.onChangeTeamB.bind(this);
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
            data: [],
            gamedayid: 0,
            played_at: '',
            time_confirmed: false,
            succes_message: false,
        }
    }

    componentDidMount() {
        axios.get('https://rolstoelhockey-backend.herokuapp.com/clubs/team')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        teams: response.data.map(team => team.teamname),
                        teamA: response.data[0].teamname,
                        teamB: response.data[0].teamname
                    })
                }
            })
        API.getData().then(response => {
            var exvalue = [{ title: 'Selecteer een dag' }]
            var joined = exvalue.concat(response);
            this.setState({ data: joined })
        })
    }

    onChangeTeamA(e) {
        this.setState({
            teamA: e.target.value
        })
    }
    onChangeTeamB(e) {
        this.setState({
            teamB: e.target.value
        })
    }
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

    onShowAlert = () => {
        this.setState({ succes_message: true }, () => {
            window.setTimeout(() => {
                this.setState({ succes_message: false })
                window.history.go(-1);
            }, 2000)
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const match = {
            teamA: this.state.teamA,
            teamB: this.state.teamB,
            scoreA: this.state.scoreA,
            scoreB: this.state.scoreB,
            gamedayid: this.state.gamedayid,
            played_at: this.state.played_at,
        }

        axios.post('https://rolstoelhockey-backend.herokuapp.com/matches/add', match)
            .then(res => this.onShowAlert());

    }

    render() {
        return (
            <div className="pageblock" style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={this.onSubmit} class="text-center border border-light p-5" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>

                    <p class="h4 mb-4" style={{ fontWeight: '100' }}>Wedstrijd toevoegen</p>

                    <div className="form-group" >
                        <label>Team: </label>
                        <select ref="teamaInput"
                            required
                            className="form-control"
                            value={this.state.teamA}
                            onChange={this.onChangeTeamA}>
                            {
                                this.state.teams.map(function (team) {
                                    return <option
                                        key={team}
                                        value={team}>{team}
                                    </option>;
                                })
                            }
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
                        <select ref="teambInput"
                            required
                            className="form-control"
                            value={this.state.teamB}
                            onChange={this.onChangeTeamB}>
                            {
                                this.state.teams.map(function (team) {
                                    return <option
                                        key={team}
                                        value={team}>{team}
                                    </option>;
                                })
                            }
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
                        <select ref="GameDayInput"
                            required
                            className="form-control"
                            placeholder="Selecteer een dag"
                            value={this.state.data.gamedayid}
                            onChange={this.onChangeGameDay}>
                            {
                                this.state.data.map(function (data) {
                                    return <option
                                        key={data.gamedayid}
                                        value={data.gamedayid}>{data.title}
                                    </option>;
                                })

                            }
                        </select>
                    </div>
                    <button class="btn btn-info btn-block" style={{ backgroundColor: bgColors["Button-Color"], border: 'none' }} type="submit">Toevoegen</button>
                </form>
                {this.state.succes_message
                    ?
                    <div class="alert alert-success" role="alert">
                        Match added!
                    </div>
                    :
                    null}
            </div>

        )
    }
}

export default AddMatch;
