import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '76229e50dfab4ed38208640297183b43'
   });

   app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
        .then(generalModel => {
          return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
        })
        .then(response => {
          var concepts = response['outputs'][0]['data']['concepts'];
          console.log(concepts);
        })

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
