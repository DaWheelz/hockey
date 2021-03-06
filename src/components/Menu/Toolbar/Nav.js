import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rolstoelhockey_logo from '../../../img/navbar_logo_rolstoelhockey.png'
import login_icon from '../../../img/login_icon.png'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            loggedIn: false,
        };
        this.currentUser = '';
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentDidMount() {
        this.checkStatus();
    }

    checkStatus(){
        if(sessionStorage.getItem('role') === 'admin')
        {
            this.setState({loggedIn: true});
        }
    }

    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return (
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgb(255, 125, 0)', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }} >
                <Link to="/">
                    <img src={rolstoelhockey_logo} alt="" width={100} height={28} className="toolbar__logo"></img>
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
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px' }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/clubs">Clubs</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px'  }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/scores">Uitslagen</Link>
                        </li>
                    </ul>
                    {this.state.loggedIn ?
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px'  }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/addmatch">Wedstrijd toevoegen</Link>
                        </li>
                    </ul>
                    :
                    <div></div>
                    }
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px'  }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/match">Zoek wedstrijd</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px'  }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/compoverview">Competitie Overzicht</Link>
                        </li>
                    </ul>
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px'  }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/contact">Contact</Link>
                        </li>
                    </ul>
                    {this.state.loggedIn ?
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px'  }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/">Logged in as: Admin</Link>
                        </li>
                    </ul>
                    :
                    <ul style={{ listStyleType: 'none',marginBottom: '0px', marginLeft: '-20px'  }}>
                        <li className="nav-item" onClick={this.toggleNavbar}>
                            <Link className="nav-link" style={{ color: '#ffffff' }} to="/login">
                                <img src={login_icon} alt="" height={25} width={25}></img>
                            </Link>
                        </li>
                    </ul>
                    }
                    
                </div>
            </nav>
        );
    }
}

export default Nav;