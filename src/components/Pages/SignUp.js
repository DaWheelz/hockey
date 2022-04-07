import React, { Component } from 'react';
import LoadingSVG from '../../img/loading.svg';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                confirmPassword: '',
                role: 'basic',
            },
            errorMessage: '',
            signingUp: false,
        }
    }

    componentWillUpdate(nextProps) {
        const { user } = this.props
        if (nextProps.user !== user) {
            this.setState({ user })
        }
    };

    SignUp(e) {
        const SIGNUP_URL = "https://rolstoelhockey-backend.herokuapp.com/auth/signup";
        e.preventDefault();
        this.setState({ errorMessage: '' })
        if (this.validUser()) {
            const bodyUser = {
                username: this.state.user.username,
                password: this.state.user.password,
                role: this.state.user.role
            };
            this.setState({ signingUp: true });
            fetch(SIGNUP_URL, {
                method: 'POST',
                body: JSON.stringify(bodyUser),
                headers: {
                    'content-type': 'application/json',
                    Accept: 'application/json',
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then((error) => {
                    throw new Error(error.message);
                });
            }).then((result) => {
                //localStorage.setItem('token', result.token);
                //localStorage.setItem('role', result.role);
                setTimeout(() => {
                    this.setState({ signingUp: false });
                    this.props.history.push('/')
                }, 1000);
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ signingUp: false });
                    this.setState({ errorMessage: error.message });
                }, 1000);
            });
        }
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
            confirmPassword: Joi.string().min(5).required(),
        });

        if (this.state.user.password !== this.state.user.confirmPassword) {
            this.setState({ errorMessage: 'Passwords must match' })
            console.log('error while validating')
            return false;
        }
        const result = Joi.validate(this.state.user, schema);
        console.log('err: ', result)

        if (result.error === null) {
            return true;
        }
        if (result.error.message.includes('username')) {
            this.setState({ errorMessage: 'Username is invalid.' })
        } else {
            this.setState({ errorMessage: 'Password is invalid.' })
        }

        return false;
    }

    onChangeUsername(e) {
        this.setState({
            user: {
                username: e.target.value,
                password: this.state.user.password,
                confirmPassword: this.state.user.confirmPassword,
            }
        });
    }
    onChangePassword(e) {
        this.setState({
            user: {
                username: this.state.user.username,
                password: e.target.value,
                confirmPassword: this.state.user.confirmPassword,
            }
        });
    }
    onChangeConfirmPassword(e) {
        this.setState({
            user: {
                username: this.state.user.username,
                password: this.state.user.password,
                confirmPassword: e.target.value,
            }
        });
    }

    render() {
        return (
            <div className="pageblock" >
                <div class="jumbotron">
                    <h1 class="display-3">Registreer</h1>
                    {this.state.signingUp ?
                        <div>
                            <img src={LoadingSVG} alt=""/>
                        </div>
                        : null}
                    {this.state.errorMessage ? <div class="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div> : null}
                    {!this.state.signingUp ?
                        <form onSubmit={e => this.SignUp(e)}>
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
                                    Gebruikersnaam moet minstens 2 character zijn en kleiner zijn dan 30 character. Gebruikersnaam kan alleen alfanumerieke tekens zijn.
                       </h5>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="password">Wachtwoord</label>
                                    <input
                                        onChange={this.onChangePassword.bind(this)}
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        aria-describedby="passwordHelp"
                                        placeholder="Wachtwoord"
                                        required />
                                    <h5 id="passwordHelp" class="form-text text-muted">
                                        Wachtwoord moet minimaal 5 characters zijn.
                                    </h5>
                                    <br />
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary">Sign up</button>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="confirmPassword">Bevestig wachtwoord</label>
                                    <input
                                        onChange={this.onChangeConfirmPassword.bind(this)}
                                        type="password"
                                        class="form-control"
                                        id="confirmPassword"
                                        aria-describedby="confirmPasswordHelp"
                                        placeholder="Bevestig wachtwoord"
                                        required />
                                    <h5 id="confirmPasswordHelp" class="form-text text-muted">
                                        Bevestig wachtwoord
                                    </h5>
                                </div>
                            </div>
                        </form>
                        : null}

                </div>
            </div >
        )
    }
}

export default SignUp;