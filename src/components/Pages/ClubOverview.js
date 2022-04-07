import React, { Component } from 'react'
import './Clubs/cardstyle.css'
import './Clubs/cards.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import '../../components/admin.css'

class ClubOverview extends Component {

    constructor() {
        super();
        this.state = {
            clubs: [],
        }
    }

    UNSAFE_componentWillMount() {
        this.getClubs();
    }

    getClubInfo() {
        axios.get('http://hockey.mutsaers.nu:5000/clubs/')
            .then(response => {
                this.setState({ clubs: response.data });
            })
    }

    render() {
        return (
            <div className="pageblock">
                <h1>Club info</h1>
                
            </div>
        );
    }

}
export default ClubOverview