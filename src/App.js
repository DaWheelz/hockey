import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../src/components/Menu/Toolbar/Toolbar.css';
import Nav from './components/Menu/Toolbar/Nav';
import Footer from './components/Menu/Toolbar/Footer';

import HomeModule from './components/Pages/Home';
import ProfileModule from './components/Pages/Profile';
import ClubsModule from './components/Pages/Clubs';
import CompetitionOverviewModule from './components/Pages/CompetitionOverview';
import UsersModule from './components/Pages/Users';
import RefereeModule from './components/Pages/Referee';
import EditUserModule from './components/Pages/EditUser';
import ContactModule from './components/Pages/Contact';
import MatchModule from './components/Pages/Scores/Match';
import MatchByTeamModule from './components/Pages/Scores/MatchByTeam';
import AddScoresModule from './components/Pages/Scores/AddMatch';
import EditScoresModule from './components/Pages/Scores/EditMatch';
import AddClubsModule from './components/Pages/Clubs/AddClubs';
import SignUpModule from './components/Pages/SignUp';
import LoginModule from './components/Pages/Login';

import { PrivateRoute } from './components/PrivateRoute';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      loggedIn: false,
      cookie: '',
      role: '',
      result: '',
    };
  }

  componentDidMount() {
    //this.mounted();
    //this.setState({ role: localStorage.getItem('role') })
  }

  mounted() {
    const API_URL = "https://rolstoelhockey-backend.herokuapp.com/";

    fetch(API_URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    }).then(result => {
      console.log('res: ', result);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route path="/" exact component={HomeModule} />
              <Route path="/profile" exact component={ProfileModule} />
              <Route path="/signup" exact component={SignUpModule} />
              <Route path="/login" exact component={LoginModule} />
              <Route path="/clubs" component={ClubsModule} />
              <Route path="/compoverview" component={CompetitionOverviewModule} />
              <Route path="/users" component={UsersModule} />
              <Route path="/scores" component={MatchModule} />
              <Route path="/match" component={MatchByTeamModule} />
              <Route path="/contact" component={ContactModule} />
              <Route path="/referee" component={RefereeModule} />
              <PrivateRoute path="/addmatch" component={AddScoresModule} />
              <PrivateRoute path="/edituser" component={EditUserModule} />
              <PrivateRoute path="/editmatch" component={EditScoresModule} />
              <PrivateRoute path="/addclubs" component={AddClubsModule} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
