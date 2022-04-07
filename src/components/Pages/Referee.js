import React, { Component } from 'react'
import axios from "axios";
import Sound from 'react-sound';
import soundEffect from '../../sounds/beep_sound.mp3'
import '../referee_style.css'
import yellowCard from '../../img/yellowcard.png';
import greenCard from '../../img/greencard.png';
import redCard from '../../img/redcard.png';

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ef790c"
};

class Referee extends Component {

    constructor(props) {
        super(props);

        this.onChangeScoreA = this.onChangeScoreA.bind(this);
        this.onChangeScoreB = this.onChangeScoreB.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            matches: [],
            selectedGame: [],
            minutes: 15,
            seconds: 0,
            timeStarted: false,
            isGameSelected: false,
            selectionChanged: false,
            teamA: '',
            scoreA: 0,
            scoreB: 0,
            teamB: '',
            update_message: false,
        }
    }

    componentDidMount() {
        this.getMatches();

        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (this.state.timeStarted) {
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(this.myInterval)
                    } else {
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                    }
                }
            }

        }, 1000)


    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    getMatches() {
        axios.get(`http://hockey.mutsaers.nu:5000/matches/findlatest/H`).then(response => {
            this.setState({ matches: response.data });
            this.setState({ matches: [{ teamA: 'Selecteer een wedstrijd' }, ...this.state.matches] });
        });

    }

    getSelectedMatch(matchid) {
        axios.get(`http://hockey.mutsaers.nu:5000/matches/findmatch/` + matchid).then(response => {
            console.log(response.data);
            this.setState({
                teamA: response.data[0].teamA,
                teamB: response.data[0].teamB,
                scoreA: response.data[0].scoreA,
                scoreB: response.data[0].scoreB
            });
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

    onShowAlert = ()=>{
        this.setState({update_message:true},()=>{
          window.setTimeout(()=>{
            this.setState({update_message:false})
          },2000)
        });
      }

    onSubmit(e) {
        e.preventDefault();

        const body = {
            teamA: this.state.teamA,
            scoreA: this.state.scoreA,
            scoreB: this.state.scoreB,
            teamB: this.state.teamB,
        }
        fetch(`http://hockey.mutsaers.nu:5000/matches/update/${this.state.selectedGame}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                this.onShowAlert();
                //return response.json();
            }
            return response.json().then((error) => {
                throw new Error(error.message);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const { minutes, seconds } = this.state

        return (
            <div className="pageblock" style={{border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <a href="http://www.knhb.nl/app/uploads/2019/10/Spelregels-Hk-2019-2020.pdf">✎ Regels - HK</a>
                    <a href="http://www.knhb.nl/app/uploads/2019/10/Ok-en-eerste-klasse-2019-2020-3-3.pdf">✎ Regels - OK/1e klasse</a>
                    <a href="/" style={{ textAlign: 'end' }}> ✘ Beëindig wedstrijd</a>
                </div>
                <div>
                    {this.state.isGameSelected ?
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
                                <button type="submit" class="btn btn-info">Save</button>
                            </div>
                        </form>
                        :
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <select required className="custom-select" value={this.state.selectedGame} onChange={(e) => { this.setState({ selectedGame: e.target.value, selectionChanged: true }); }}>
                                {this.state.matches.map(match => (
                                    <option
                                        key={match._id}
                                        value={match._id}
                                    >
                                        {match.teamA} - {match.teamB}
                                    </option>
                                ))}
                            </select>
                            {this.state.selectionChanged
                                ?
                                <button type="submit" style={{ backgroundColor: bgColors["Button-Color"], color: 'white' }} class="fa fa-search search-button" onClick={() => { this.getSelectedMatch(this.state.selectedGame); this.setState({ isGameSelected: true }); }}></button>
                                :
                                null}

                        </div>
                    }
                    <br />
                    {this.state.update_message
                        ?
                        <div class="alert alert-info" role="alert">
                            Match updated!
                        </div>
                        : null}
                </div>

                <div style={{ textAlign: 'center' }}>
                    {minutes === 0 && seconds === 0
                        ? <div>
                            <h2>Time's up!</h2>
                            <Sound
                                url={soundEffect}
                                playStatus={Sound.status.PLAYING}
                                playFromPosition={2000 /* in milliseconds */}
                                onLoading={this.handleSongLoading}
                                onPlaying={this.handleSongPlaying}
                                onFinishedPlaying={this.handleSongFinishedPlaying}
                            />
                        </div>
                        :
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="button" class="btn btn-outline-success" onClick={(e) => { this.setState({ minutes: minutes + 1 }) }}>+</button>
                                <button type="button" class="btn btn-outline-success" onClick={(e) => { this.setState({ seconds: seconds + 1 }) }}>+</button>
                            </div>
                            <h1 style={{ fontSize: '100px' }}>
                                {minutes}
                                :
                            {seconds < 10 ? `0${seconds}` : seconds}
                            </h1>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="button" class="btn btn-outline-danger" onClick={(e) => { this.setState({ minutes: minutes - 1 }) }}>-</button>
                                <button type="button" class="btn btn-outline-danger" onClick={(e) => { this.setState({ seconds: seconds - 1 }) }}>-</button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button button type="button" class="btn btn-primary" onClick={(e) => { this.setState({ timeStarted: true }) }}>Start</button>
                                <button button type="button" class="btn btn-warning" onClick={(e) => { this.setState({ minutes: 15, seconds: 0, timeStarted: false }) }}>Reset</button>
                            </div>
                        </div>
                    }

                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="button" class="transparant-btn" data-toggle="modal" data-target="#yellowCard">
                        <img alt="" style={{ width: '80px', marginTop: '40px' }} src={yellowCard}></img>
                    </button>
                    <button type="button" class="transparant-btn" data-toggle="modal" data-target="#greenCard">
                        <img alt="" style={{ width: '110px', marginTop: '40px' }} src={greenCard}></img>
                    </button>
                    <button type="button" class="transparant-btn" data-toggle="modal" data-target="#redCard">
                        <img alt="" style={{ width: '110px', marginTop: '40px' }} src={redCard}></img>
                    </button>
                </div>
                <div class="modal fade" id="yellowCard" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body" data-dismiss="modal">
                                <img alt="" className="card" src={yellowCard}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="greenCard" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body" data-dismiss="modal">
                                <img alt="" className="card" src={greenCard}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="redCard" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body" data-dismiss="modal">
                                <img alt="" className="card" src={redCard}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Referee;
