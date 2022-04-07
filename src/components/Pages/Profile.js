import React, { Component } from 'react'
import '../admin.css'
import axios from 'axios'
import Switch from '@material-ui/core/Switch';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ef790c"
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ef790c'
        }
    },
});

class Profile extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSubscribe = this.onChangeSubscribe.bind(this);
        this.onChangeFollowedTeam = this.onChangeFollowedTeam.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            username: '',
            email: '',
            followedTeamId: '',
            firstName: '',
            lastName: '',
            isSubscribed: false,
            errorMessageSubscribe: '',
            succesFormSend: false,
            teams: [],
        }
    }

    componentDidMount() {
        this.getUsers()
        this.getTeams()
    }

    getTeams() {
        fetch(`https://rolstoelhockey-backend.herokuapp.com//clubs/team/`).then(response => {
            return response.json()
        }).then(data => {
            const teamsFromApi = data.map(team => {
                return { value: team._id, display: team.teamname };
            });
            this.setState({
                teams: [
                    {
                        value: 1,
                        display: "Selecteer een team"
                    }
                ].concat(teamsFromApi)
            });
        })
    }

    getUsers() {

        const API_URL = "https://rolstoelhockey-backend.herokuapp.com//s";

        fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(res => res.json())
            .then(result => {
                if (result.user) {
                    this.setState({ id: result.user._id })
                    axios.get(`https://rolstoelhockey-backend.herokuapp.com//users/${result.user._id}`).then(response => {
                        this.setState({
                            username: response.data.username,
                            email: response.data.email,
                            firstName: response.data.firstname,
                            lastName: response.data.lastname,
                            isSubscribed: response.data.subscribed,
                            followedTeamId: response.data.followedteamid,
                        });
                    });
                } else {
                    localStorage.removeItem('token');
                }
            });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeSubscribe(e) {
        this.setState({
            isSubscribed: e.target.checked
        })
    }
    onChangeFollowedTeam(e) {
        this.setState({
            followedTeamId: e.target.value
        })

        console.log(this.state.followedTeamId)
    }

    onSubmit(e) {
        e.preventDefault();

        const body = {
            username: this.state.username,
            email: this.state.email,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            subscribed: this.state.isSubscribed,
            followedteamid: this.state.followedTeamId
        }

        fetch(`https://rolstoelhockey-backend.herokuapp.com//users/updateprofile/${this.state.id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                this.setState({ succesFormSend: true })
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
            <div className="profile_pageblock">
                <form onSubmit={this.onSubmit} id="profile_form" className="profile_information">
                    <p class="text-center h2 mb-4" style={{ fontWeight: '100' }}>Profiel</p>
                    <div>
                        <div className="form-group" style={{ width: '100%' }}>
                            <h6>Gebruikersnaam *: </h6>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            </input>
                        </div>
                        <div className="form-group" style={{ width: '100%' }}>
                            <h6>Wachtwoord *: </h6>
                            <input type="password"
                                required
                                disabled
                                placeholder="************"
                                className="form-control"
                                value={this.state.password}>
                            </input>
                        </div>
                        <div className="form-group" style={{ width: '100%' }}>
                            <h6>Voornaam *: </h6>
                            <input
                                type="text"
                                required
                                placeholder="Geen voornaam gevonden in het systeem"
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}>
                            </input>
                        </div>
                        <div className="form-group" style={{ width: '100%' }}>
                            <h6>Achternaam: </h6>
                            <input
                                type="text"
                                placeholder="Geen achternaam gevonden in het systeem"
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}>
                            </input>
                        </div>
                        <div className="form-group" style={{ width: '100%' }}>
                            <h6>Email *: </h6>
                            <input type="email"
                                id="emailfield"
                                required
                                placeholder="Geen email gevonden in het systeem"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}>
                            </input>
                        </div>
                        <div className="form-group" style={{ width: '100%' }}>
                            {this.state.succesFormSend ?
                                <div class="alert alert-success" role="alert">
                                    Opgeslagen!
                            </div>
                                : null}
                            <button class="btn btn-info btn-block" style={{ backgroundColor: bgColors["Button-Color"], border: 'none' }} type="submit">Opslaan</button>
                        </div>
                    </div>
                </form>
                <div className="profile_pic_subscribe">
                    <div style={{ display: 'grid', textAlign: 'center' }}>
                        <img alt='' style={{ margin: 'auto' }} src={`http://eu.ui-avatars.com/api/?size=120&background=ffb166&color=fffff&rounded=true&name=${this.state.firstName}+${this.state.lastName}`}></img>
                        <br />
                        <h6>{this.state.firstName} {this.state.lastName}</h6>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <h5 style={{ margin: 'auto' }}>Abonneer op onze nieuwsbrief. </h5>
                            <ThemeProvider theme={theme}>
                                <Switch
                                    checked={this.state.isSubscribed}
                                    onChange={this.onChangeSubscribe}
                                    color="primary"
                                    bgColors="default"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </ThemeProvider>
                        </div>
                        <br />
                        <div className="form-group" style={{ width: '100%' }}>
                            <h6>Welk team wil jij volgen? : </h6>
                            <select className="custom-select" value={this.state.followedTeamId} onChange={this.onChangeFollowedTeam}>
                                {this.state.teams.map(team => (
                                    <option
                                        key={team.value}
                                        value={team.value}>
                                        {team.display}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {this.state.errorMessageSubscribe ?
                            <div class="alert alert-danger" role="alert">
                                {this.state.errorMessageSubscribe}
                            </div>
                            : null}
                    </div>
                </div>
            </div >

        )
    }
}

export default Profile;
