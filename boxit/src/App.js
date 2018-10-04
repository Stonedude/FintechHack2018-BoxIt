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
      this.getAccounts();
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

  makeTransaction = (accountnumber) => {
    request.post(this.getOptionsForPostRequest('make', {token: this.state.token, accountnumber}), (err, req, body) => {
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
        {this.state.page === 0 &&
          <div className="App">
            <div className="grid-item" id="logo"> Logoting</div>
            <div className="grid-item" id="title">Titletuff</div>
            <button className="grid-item" id="button" onClick={() => this.setPage(1)}>Pay monies</button>

            <div className="grid-item" id="content1">Dis a car</div>
            <div className="grid-item" id="content2">Dis a snake</div>
            <div className="grid-item" id="content3">Turtles here</div>
            <div className="grid-item" id="sidebar1">Shoppo stuff</div>
            <div className="grid-item" id="sidebar2">More things here</div>

            <div className="grid-item" id="bottom">This is the end</div>
          </div>
        }

        {this.state.page === 1 &&
          <div>
            <div className="grid-item" id="logo"> BoxIt</div>
            <div className="grid-item" id="title">BOxibot</div>

            <h2>Velg en bank du vil betale fra</h2>
            <ul>
              <li onClick={() => {this.setPage(2);this.login();}}>Sparebank 1</li>
              <li>SBanken</li>
              <li>DNB</li>
            </ul>

          </div>
        }
        {this.state.page === 2 &&
          <div>
            <div className="grid-item" id="logo"> BoxIt</div>
            <div className="grid-item" id="title">BOxibot</div>

            <h2>Hvilken konto vil du betale fra?</h2>
            <table>
              <tbody>
                {this.state.accounts.length === 0 && <tr>Loading...</tr>}
                {this.state.accounts.map(elem => 
                  <tr key={elem.accountNumber.value} onClick={() => {this.makeTransaction(elem.accountNumber.value);this.setPage(3)}}>
                    <td>{elem.name}</td>
                    <td>{elem.description}</td>
                    <td>{elem.availableBalance.amount}</td>
                  </tr>
                  )}
              </tbody>
            </table>
          </div>
        }
        {(this.state.page === 3 && !this.state.transaction) && <div>Loading....</div>}

        {(this.state.page === 3 && this.state.transaction) &&
          <div>
          <div className="grid-item" id="logo"> BoxIt</div>
          <div className="grid-item" id="title">BOxibot</div>

          <h2>Er dette riktig?</h2>
          <p>Support: Superbil</p>
          <p>From account: {this.state.transaction.fromAccountNumber}</p>
          <p>Amount: {this.state.transaction.amount}{this.state.currencyCode}</p>
          <p>Status: {this.state.transaction.signingStatus}</p>
          <button onClick={() => {this.confirmTransaction(); this.setPage(4)}}>Confirm</button>
        </div>
      }

      {(this.state.page === 4 && !this.state.transaction && this.state.transaction.signingStatus !== 'COMPLETE') && <div>Loading....</div>}

      {(this.state.page === 4 && this.state.transaction && this.state.transaction.signingStatus === 'COMPLETE') &&
        <div>
          <div className="grid-item" id="logo"> Logoting</div>
          <div className="grid-item" id="title">Thank you for your support</div>
          <button className="grid-item" id="button" onClick={() => this.setPage(1)}>Pay monies</button>

          <div className="grid-item" id="content1">Dis a car</div>
          <div className="grid-item" id="content2">Dis a snake</div>
          <div className="grid-item" id="content3">Turtles here</div>
          <div className="grid-item" id="sidebar1">Shoppo stuff</div>
          <div className="grid-item" id="sidebar2">More things here</div>

          <div className="grid-item" id="bottom">This is the end</div>

        </div>
      }
      
        
      </div>
    );
  }
}

export default App;
