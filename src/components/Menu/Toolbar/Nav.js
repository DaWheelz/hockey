import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rolstoelhockey_logo from '../../../img/navbar_logo_rolstoelhockey.png'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            loggedIn: false,
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentDidMount() {

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
                    <ul className='navbar-nav ml-auto'>
                        <li className="nav-item active" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#fffff' }} to="/">Home</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/clubs">Clubs</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/scores">Uitslagen</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/compoverview">Competitie Overzicht</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;