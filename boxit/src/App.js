import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
      </div>
    );
  }
}

export default App;
