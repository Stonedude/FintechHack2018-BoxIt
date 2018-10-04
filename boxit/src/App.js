import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var request = require('request');

class App extends Component {

  constructor() {
    super();
      this.state = {token: ''}
  }

  login = () => {
    request.get('http://localhost:8080/bearer', (err, req, body) => {
      this.setState({token: body})
    });
  }

  render() {
    return (
      <div className="App">

        <div className="grid-item" id="logo"> Logoting</div>
        <div className="grid-item" id="title">Titletuff</div>
        <button className="grid-item" id="button">Buttonhere</button>

        <div className="grid-item" id="content1">Dis a car</div>
        <div className="grid-item" id="content2">Dis a snake</div>
        <div className="grid-item" id="content3">Turtles here</div>
        <div className="grid-item" id="sidebar1">Shoppo stuff</div>
        <div className="grid-item" id="sidebar2">More things here</div>

        <div className="grid-item" id="bottom">This is the end</div>
<<<<<<< HEAD
=======
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a onClick={this.login}>Pay monies</a>
          <p>{this.state.token}</p>
>>>>>>> bed02dd422c79e33b249f4bddac72d03be2a0773
      </div>
    );
  }
}

export default App;
