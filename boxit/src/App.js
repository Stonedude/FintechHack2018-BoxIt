import React, { Component } from 'react';
import './App.css';
import carImage from './Media/Car.png';
var request = require('request');

class App extends Component {

  constructor() {
    super();
      this.state = {
        token: '',
        accounts: [],
        page: 0,
      }
  }

  setPage = (n) => {
    this.setState({page: n})
  }

  login = () => {
    request.get('http://localhost:8080/bearer', (err, req, body) => {
      this.setState({token: body})
    });
  }

  getOptionsForPostRequest = (url, obj) => {
    return {
      url: `http://localhost:8080/${url}`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(obj)
    }
  }

  getAccounts = () => {
    request.post(this.getOptionsForPostRequest('accounts', this.state), (err, req, body) => {
      this.setState({accounts: JSON.parse(body)})
    })
  }

  makeTransaction = () => {
    request.post(this.getOptionsForPostRequest('make', {token: this.state.token, accountnumber: this.state.accounts[0].accountNumber.value}), (err, req, body) => {
      this.setState({transaction: JSON.parse(body)})
    })
  }
  confirmTransaction = () => {
    request.post(this.getOptionsForPostRequest('confirm', {token: this.state.token, signingreference: this.state.transaction.signingReference}), (err, req, body) => {
      this.setState({transaction: JSON.parse(body)})
  })
}
  
  render() {
    return (
      <div>
        {this.state.page == 0 &&
          <div className="App">
            <div className="grid-item" id="logo"> </div>
            <div className="grid-item" id="title"><h1>JustCrowdThings</h1><p>Powered by BoXIt</p></div>
            <button className="grid-item" id="button" onClick={() => this.setPage(1)}>Pay monies</button>

            <div className="grid-item" id="content1">
            <img src={carImage}/>
            </div>

            <div className="grid-item" id="content2">
            <article>
              <h1>Den nye fantastiske svenske TESLÄ MODEL Q er ute!</h1>
              <p>Etter at selveste Elon Musk ble utstøtt av Tesla boardet bestemte den verdensberømte günderen for å flytte til sverige og starte på nytt! Hans nye kraftrakett TESLÄ Q er et teknologisk underverk av en bil, og kommer til å gå inn i produksjon så snart Elon får tid til å bygge en ny fabrikk.</p>
              
            </article>            
            </div>
            <div className="grid-item" id="content3">Turtles here</div>
            <div className="grid-item" id="sidebar1">Shoppo stuff</div>
            <div className="grid-item" id="sidebar2">More things here</div>

            <div className="grid-item" id="bottom">This is the end</div>

            <a onClick={this.getAccounts}>Login to sparebanken</a>
            <a onClick={this.makeTransaction}>Make transaction</a>
            <a onClick={this.confirmTransaction}>Confirm</a>
            {this.state.token && <p>{this.state.token}</p>}
            {this.state.accounts.length > 0 && <p>{this.state.accounts[0].accountNumber.value}</p>}
            {this.state.transaction && <div><p>Amount: {this.state.transaction.amount}</p><p>Status: {this.state.transaction.signingStatus}</p></div>}
          </div>
        }

        {this.state.page == 1 &&
          <div className= "App">
            <div className="grid-item" id="logo"> BoxIt</div>
            <div className="grid-item" id="title">BOxibot</div>
            <button className="grid-item" id="button" onClick={() => this.setPage(2)}>Pay monies</button>

            <div className="grid-item" id="content1">Dis a car</div>
            <div className="grid-item" id="content2">Dis a snake</div>
            <div className="grid-item" id="content3">Turtles here</div>
            <div className="grid-item" id="sidebar1">
              <div className="box"></div> 
            
            </div>
            <div className="grid-item" id="sidebar2">More things here</div>

            <div className="grid-item" id="bottom">This is the end</div>
            
            <a onClick={this.login}>Login</a>
            <a onClick={this.getAccounts}>Login to sparebanken</a>
            <a onClick={this.makeTransaction}>Make transaction</a>
            <a onClick={this.confirmTransaction}>Confirm</a>
            {this.state.token && <p>{this.state.token}</p>}
            {this.state.accounts.length > 0 && <p>{this.state.accounts[0].accountNumber.value}</p>}
            {this.state.transaction && <div><p>Amount: {this.state.transaction.amount}</p><p>Status: {this.state.transaction.signingStatus}</p></div>}
          </div>
        }
        
      </div>
    );
  }
}

export default App;
