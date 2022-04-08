import React, { Component } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import 'react-confirm-alert/src/react-confirm-alert.css';

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ff7d00"
};

var compDivision = [
    { id: 0, title: "Selecteer een klasse" },
    { id: 1, title: "Hoofdklasse" },
    { id: 2, title: "Overgangsklasse" },
    { id: 3, title: "1e klasse" },
    { id: 4, title: "2e klasse" },
    { id: 5, title: "3e klasse" }
];

class Settings extends Component {
    constructor() {
        super();

        this.state = {
            teamsH: [],
            teamsE: [],
            validationError: "",
            loggedIn: false,
            selectChanged: false,
            compId: 0,
        };
    }

    getTeamsH(compid) {
        this.state.compId = compid;
        axios.get(`https://rolstoelhockey-backend.herokuapp.com/clubs/team/` + compid + "/H").then(response => {
            this.setState({ teamsH: response.data });
        });
    }

    getTeamsE(compid) {
        this.state.compId = compid;
        console.log(compid);
        axios.get(`https://rolstoelhockey-backend.herokuapp.com/clubs/team/` + compid + "/E").then(response => {
            this.setState({ teamsE: response.data });
        });
    }
    render() {
        return (
            <div>
                
                <div style={{ display: 'flex' }}>
                    <select className='custom-select' value={this.state.compId} onChange={(e) => { this.getTeamsH(e.target.value); this.getTeamsE(e.target.value); }}>
                        {compDivision.map(comp => (
                            <option
                                key={comp.id}
                                value={comp.id}>
                                {comp.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="pageblock" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
                <a>H-Hockey</a>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">Naam</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">GS</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">GW</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">GL</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">VL</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">PT</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">V</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">T</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">DS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.teamsH.map(team => (
                                <TableRow key={team._id} style={{ height: '20px' }}>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.teamname}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.GS}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.GW}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.GL}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.VL}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.PT}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.V}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.T}</TableCell>
                                    <TableCell component="th" scope="row" padding="none" align="center">{team.DS}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
            <div className="pageblock" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
            <a>E-Hockey</a>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Naam</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">GS</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">GW</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">GL</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">VL</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">PT</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">V</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">T</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">DS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.teamsE.map(team => (
                            <TableRow key={team._id} style={{ height: '20px' }}>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.teamname}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.GS}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.GW}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.GL}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.VL}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.PT}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.V}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.T}</TableCell>
                                <TableCell component="th" scope="row" padding="none" align="center">{team.DS}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
        </div>
        );
    }
}

export default Settings;
