import React, { Component } from 'react'
import axios from 'axios';

var textColor = "#1f1f1f";

class Club extends Component {

    constructor() {
        super();
        this.state = {
            clubs: [],
            loggedIn: false
        }
    }

    UNSAFE_componentWillMount() {
        this.getClubs();
        if (localStorage.getItem('token')) {
            this.setState({ loggedIn: true })
        }
    }

    getClubs() {
        axios.get('https://rolstoelhockey-backend.herokuapp.com/clubs/H')
            .then(response => 
                this.setState({ clubs: response.data }));
    }

    render() {
        const clubItems = this.state.clubs.map((club, i) => {
            return (
                <div className="match-group" key={club._id}>
                    <div className="clubnameinfo">{club.clubname}</div>
                    <div className="clubaddressinfo">{club.address}</div>
                    <a href={club.website}><b className="link">Website</b></a>
                </div>
            )
        });
        return (
            <div className="pageblock" style={{border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)'}}>
                <h4 style={{ color: textColor, fontWeight: '600' }}>Clubs</h4>
                <div className="clubheader">
                    <h4 className="clubnameheader">Naam</h4>
                    <h4 className="clubaddressheader">Adres</h4>
                </div>
                <div>
                    {clubItems}
                </div>
            </div>
        );
    }
}
export default Club;
