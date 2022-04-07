import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rolstoelhockey_logo from '../../../img/navbar_logo_rolstoelhockey.png'
import dotenv from 'dotenv'

dotenv.config()

class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            loggedIn: false,
            role: localStorage.getItem('role'),
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentDidMount() {
        //this.getUser();
    }

     getUser() {
        const API_URL = "https://rolstoelhockey-backend.herokuapp.com//";

        fetch(API_URL, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(res => res.json())
            .then(result => {
                if (result.user) {
                    this.setState({ user: result.user });
                    this.setState({ loggedIn: true });
                } else {
                    localStorage.removeItem('token');
                }
            });
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.reload(true);
    }

    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return (
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgb(255, 125, 0)', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }} >
                <Link to="/">
                    <img src={rolstoelhockey_logo} alt="" className="toolbar__logo"></img>
                </Link>
                <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className={`${classOne}`} id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#fffff', marginLeft: '10px' }} to="/">Home</Link>
                        </li>
                    </ul>
                    <div className="navbar_menu_items">
                        <a href="/clubs" class="nav-item dropdown" style={{ textDecoration: 'none', margin: '10px', color: '#ffffff' }}>
                            Clubs
                        </a>
                        {/* eslint-disable-next-line */}
                        <a href="/scores" class="nav-item dropdown" style={{ textDecoration: 'none', margin: '10px', color: '#ffffff' }}>
                            Uitslagen
                        </a>
                    </div>
                    <ul style={{ listStyleType: 'none', marginLeft: '-55px', marginBottom: '0px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff', marginLeft: '10px' }} to="/compoverview">Competitie Overzicht</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none', marginLeft: '-55px', marginBottom: '0px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff', marginLeft: '10px' }} to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;