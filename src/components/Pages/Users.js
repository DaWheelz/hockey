import React, { Component } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ff7d00"
};


class Users extends Component {
    constructor() {
        super();

        this.state = {
            users: [],
            validationError: "",
            loggedIn: false,
            selectChanged: false,
        };
    }
    componentWillMount() {
        this.getUsers()
    };

    getUsers() {
        axios.get(`http://hockey.mutsaers.nu:5000/users/`).then(response => {
            this.setState({ users: response.data });
        });
    }



    delete = (userid) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this file?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                axios.delete(`http://hockey.mutsaers.nu:5000/users/delete/${userid}`).then(response => {
                                    window.location.reload(true);
                                })
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                    </button>
                    </div>
                );
            }
        });
    };

    render() {
        return (
            <div className="pageblock" style={{ border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)' }}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">Username</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">Wachtwoord</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="center">Role</TableCell>
                                <TableCell align="right"><a href="/signup">Add users +</a></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map(user => (
                                <TableRow key={user._id}>
                                    <TableCell component="th" scope="row" align="center">{user.username}</TableCell>
                                    <TableCell align="center" >••••••••••••</TableCell>
                                    <TableCell align="center">{user.role}</TableCell>
                                    <TableCell style={{ borderTop: '1px solid #e0e0e0' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <a style={{ backgroundColor: bgColors["Button-Color"], color: 'white', border: 'none', borderRadius: '10px', padding: '7px', marginRight: '20px', textDecoration: 'none' }} href={`/edituser/?userid=${user._id}`}>Edit</a>
                                            <button style={{ backgroundColor: bgColors["Button-Color"], color: 'white', border: 'none', borderRadius: '10px', padding: '7px', marginLeft: '20px' }} onClick={() => { this.delete(`${user._id}`) }}>Delete</button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Users;
