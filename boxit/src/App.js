import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
      <div className="App">
        {this.state.page == 0 &&
          <div>
            <div className="grid-item" id="logo"> Logoting</div>
            <div className="grid-item" id="title">Titletuff</div>
            <button className="grid-item" id="button" onClick={() => this.setPage(1)}>Pay monies</button>

            <div className="grid-item" id="content1">Dis a car</div>
            <div className="grid-item" id="content2">Dis a snake</div>
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
          <div>
            <div className="grid-item" id="logo"> BoxIt</div>
            <div className="grid-item" id="title">BOxibot</div>
            <button className="grid-item" id="button" onClick={() => this.setPage(2)}>Pay monies</button>

            <div className="grid-item" id="content1">Dis a car</div>
            <div className="grid-item" id="content2">Dis a snake</div>
            <div className="grid-item" id="content3">Turtles here</div>
            <div className="grid-item" id="sidebar1">Shoppo stuff</div>
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
