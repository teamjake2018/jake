import React, { Component } from 'react';
import logo from '../static/logo.svg';
import '../styles/App.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'b3300620696b4d859b5a0fb073f83bc4'
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
