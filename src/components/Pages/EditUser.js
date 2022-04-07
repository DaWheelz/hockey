import React, { Component } from 'react'
import axios from 'axios';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ef790c"
};

class EditMatch extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            role: 'admin',
        }
    }

    componentWillMount() {
        const userid = urlParams.get('userid')

        axios.get('http://hockey.mutsaers.nu:5000/users/update/' + userid)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    role: response.data.role,
                })
            });

    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const userid = urlParams.get('userid')

        const body = {
            username: this.state.username,
            role: this.state.role,
        }
        fetch(`http://192.168.1.73:3000/users/update/${userid}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                this.props.history.push('/settings')
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
            <div className="pageblock" style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={this.onSubmit} class="text-center border border-light p-5" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
                    <p class="h4 mb-4" style={{ fontWeight: '100' }}>Gebruiker aanpassen</p>
                    <div className="form-group" >
                    <label>Gebruikersnaam: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                        </input>
                    </div>
                    <div className="form-group" >
                        <label>Role: </label>
                        <select ref="GameDayInput"
                            required
                            className="form-control"
                            placeholder="Selecteer een dag"
                            value={this.state.role}
                            onChange={this.onChangeRole}>
                                <option value="admin">Admin</option>
                                <option value="referee">Scheidsrechter</option>
                                <option value="basic">Basis gebruiker</option>
                        </select>
                    </div>

                    <button class="btn btn-info btn-block" style={{ backgroundColor: bgColors["Button-Color"], border: 'none' }} type="submit">Aanpassen</button>

                </form>
                {this.state.succes_message
                    ?
                    <div class="alert alert-success" role="alert">
                        Gebruiker aangepast!
                </div>
                    :
                    null}
            </div>
        )
    }
}

export default EditMatch;
