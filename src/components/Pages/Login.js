import React, { Component } from 'react';
import LoadingSVG from '../../img/loading.svg';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
            },
            errorMessage: '',
            loggingIn: false,
            token: '',
        }
    }

    Login(e) {
        const LOGIN_URL = "http://hockey.mutsaers.nu:5000/auth/login/";
        //const LOGIN_URL = "//hockey.mutsaers.nu:3000/auth/login/";
        e.preventDefault();
        this.setState({ errorMessage: '' })
        if (this.validUser()) {
            this.setState({ loggingIn: true });
            const body = {
                username: this.state.user.username,
                password: this.state.user.password
            }
            fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(body)
            }).then((response) => {
                
                if (response.ok) {
                    return response.json()
                }
                return response.json().then((error) => {
                    console.log(error.message);
                    this.setState({ errorMessage: error })
                    throw new Error(error.message);
                });
            }).then((result) => {
                console.log('res: ', result)
                localStorage.setItem('token', result.token)
                localStorage.setItem('role', result.role)
                setTimeout(() => {
                    console.log('logged in...')
                    this.setState({ loggingIn: true });
                    this.props.history.push('/');
                    window.location.reload(true);
                }, 1000);
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loggingIn: false });
                    this.setState({ errorMessage: error.message });
                }, 1000);
            });
        }
    }

    onChangeUsername(e) {
        this.setState({
            user: {
                username: e.target.value,
                password: this.state.user.password,
            }
        });
    }
    onChangePassword(e) {
        this.setState({
            user: {
                username: this.state.user.username,
                password: e.target.value,
            }
        });
    }

    validUser() {
        const Joi = require('joi');

        const schema = Joi.object({
            username: Joi.string()
                .regex(/(^[a-zA-Z0-9_]*$)/)
                .min(2)
                .max(30)
                .required(),

            password: Joi.string().min(5).required(),
        });

        const result = Joi.validate(this.state.user, schema);

        if (result.error === null) {
            this.setState({ loggedIn: true });
            return true;
        }
        if (result.error.message.includes('username')) {
            this.setState({ errorMessage: 'Username is invalid.' })
        } else {
            this.setState({ errorMessage: 'Password is invalid.' })
        }

        return false;
    }

    render() {
        return (
            <div className="pageblock">
                <div class="jumbotron">
                    <h1 class="display-3">Login</h1>
                    {this.state.loggingIn ?
                        <div>
                            <img src={LoadingSVG} alt="" />
                        </div>
                        : null}
                    {this.state.errorMessage ? <div class="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div> : null}
                    {!this.state.loggingIn ?
                        <form onSubmit={e => this.Login(e)}>
                            <div class="form-group">
                                <label for="username">Gebruikersnaam</label>
                                <input
                                    onChange={this.onChangeUsername.bind(this)}
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    aria-describedby="usernameHelp"
                                    placeholder="Voer gebruikersnaam in"
                                    required />
                                <h5 id="usernameHelp" class="form-text text-muted">
                                    Voer je gebruikersnaam in om in te loggen.
                             </h5>
                            </div>
                            <div class="form-group">
                                <label for="password">Wachtwoord</label>
                                <input
                                    onChange={this.onChangePassword.bind(this)}
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    aria-describedby="passwordHelp"
                                    placeholder="Wachtwoord"
                                    autoComplete={false}
                                    required />
                                <h5 id="passwordHelp" class="form-text text-muted">
                                    Voer je wachtwoord in om in te loggen.
                             </h5>
                                <br />
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                                <label>Nog geen account?
                                <Link to="/signup">
                                    <button type="button" class="btn btn-default btn-xs" style={{ margin: '0px', paddingTop: '2px', color: '#ef790c' }}>Registreer</button>
                                </Link>
                                </label>
                            </div>
                        </form>
                        : null}
                </div>
            </div >
        )
    }
}

export default Login;