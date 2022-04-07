import React, { Component } from 'react'
import "./addmatch.css";
import axios from 'axios';
import '../../referee_style.css'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ef790c"
  };

class EditMatch extends Component {

    constructor(props) {
        super(props);

        this.onChangeScoreA = this.onChangeScoreA.bind(this);
        this.onChangeScoreB = this.onChangeScoreB.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            teamA: '',
            scoreA: 0,
            scoreB: 0,
            teamB: '',
            teams: [],
            gameday: 0,
            gamedays: [],
        }
    }

    componentWillMount() {
        const matchid = urlParams.get('matchid')
        console.log('gameid: ' + matchid);

        axios.get('http://192.168.1.73:3000/matches/update/' + matchid)
            .then(response => {
                this.setState({
                    teamA: response.data.teamA,
                    teamB: response.data.teamB,
                    scoreA: response.data.scoreA,
                    scoreB: response.data.scoreB
                })
                console.log("teamA: " + this.state.teamA + " teamB: " + this.state.teamB + " scoreA: " + this.state.scoreA + " scoreB: " + this.state.scoreB);
            });

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
            gameday: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const matchid = urlParams.get('matchid')

        const body = {
            teamA: this.state.teamA,
            scoreA: this.state.scoreA,
            scoreB: this.state.scoreB,
            teamB: this.state.teamB,
        }
        fetch(`http://192.168.1.73:3000/matches/update/${matchid}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                this.props.history.push('/')
                return response.json();
            }
            return response.json().then((error) => {
                throw new Error(error.message);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="pageblock" style={{border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)'}}>
                <h1 style={{fontWeight:'100'}}>Wedstrijd aanpassen</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mobile-score">
                        <div className="form-group" style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <input type="text"
                                className="score-team"
                                disabled
                                value={this.state.teamA}>
                            </input>
                        </div>
                        <div className="form-group" style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <div className="referee-input-score-bg">
                                <input type="number"
                                    className="mobile-score-input"
                                    maxlength='2'
                                    value={this.state.scoreA}
                                    onChange={this.onChangeScoreA}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group" style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <div className="referee-input-score-bg">
                                <input type="number"
                                    className="mobile-score-input"
                                    maxlength='2'
                                    value={this.state.scoreB}
                                    onChange={this.onChangeScoreB}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group" style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                            <input type="text"
                                className="score-team"
                                disabled
                                value={this.state.teamB}>
                            </input>
                        </div>
                        <br />
                        <br />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" label="Primary" style={{ backgroundColor: bgColors["Button-Color"], color: 'white', border: 'none', borderRadius: '10px', padding: '7px' }}>Opslaan</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default EditMatch;
