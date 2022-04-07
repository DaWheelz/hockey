import React, { Component } from 'react'
import axios from 'axios';

var bgColors = {
    "Default": "#81b71a",
    "Button-Color": "#ef790c"
  };


class AddClub extends Component {

    constructor(props) {
        super(props);

        this.onChangeClubName = this.onChangeClubName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            clubname: '',
            address: '',
            website: '',
            succes_message: false,
        }
    }

    onChangeClubName(e) {
        this.setState({
            clubname: e.target.value
        })
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }
    onChangeWebsite(e) {
        this.setState({
            website: e.target.value
        })
    }

    onShowAlert = ()=>{
        this.setState({succes_message:true},()=>{
          window.setTimeout(()=>{
            this.setState({succes_message:false})
            window.history.go(-1);
          },2000)
        });
      }

    onSubmit(e) {
        e.preventDefault();

        const match = {
            clubname: this.state.clubname,
            address: this.state.address,
            website: this.state.website
        }

        console.log(match);

        axios.post('http://hockey.mutsaers.nu:5000/clubs/add', match)
            .then(res => this.onShowAlert());
    }

    render() {
        return (
            <div className="pageblock" style={{display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={this.onSubmit} class="text-center border border-light p-5" style={{border: '1px solid #dadada', padding: '20px', backgroundColor: 'white', borderRadius: '.1875rem', boxShadow: '0 1px 15px 1px rgba(39,39,39,.1)'}}>
                <p class="h4 mb-4" style={{fontWeight:'100'}}>Club toevoegen</p>

                    <div className="form-group" >
                        <label>Naam:</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.clubname}
                            onChange={this.onChangeClubName}>
                        </input>
                    </div>
                    <div className="form-group" >
                    <label>Adres:</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}>
                        </input>
                    </div>
                    <div className="form-group" >
                    <label>Website:</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.website}
                            onChange={this.onChangeWebsite}>
                        </input>
                    </div>
                    <div className="form-group">
                    <button type="submit" label="Primary" style={{ backgroundColor: bgColors["Button-Color"], color: 'white', border: 'none', borderRadius: '10px', padding: '7px' }}>Toevoegen</button>
                    </div>
                </form>
                {this.state.succes_message
                    ?
                    <div class="alert alert-success" role="alert">
                        Club added!
                    </div>
                    :
                    null}
            </div>

        )
    }
}

export default AddClub;
