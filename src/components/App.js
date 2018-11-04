import React, { Component } from 'react';
// import logo from '../static/logo.svg';
import '../styles/App.css';
import Tags from './Tags.js';
import { get } from 'http';

const Clarifai = require("clarifai");

// Clarifai instance
const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://samples.clarifai.com/metro-north.jpg',
      tags: []
    }
  }

  searchHandler = (event) => {
    event.preventDefault();
    console.log('url: ', event.target.value);
    this.setState({ url: event.target.value });
    console.log("Searching!");
  }

  apiCall = () => {
    app.models
      .initModel({
        id: Clarifai.GENERAL_MODEL,
        version: "aa7f35c01e0642fda5cf400f543e7c40"
      })
      .then(generalModel => {
        return generalModel.predict(
          this.state.url
        );
      })
      .then(response => {
        var concepts = response["outputs"][0]["data"]["concepts"];
        console.log({ concepts });
        const names = concepts.map(elm => elm.name);
        console.log({ names });
        return names;
      })
      .then( names => {
        this.setState({ tags: names });
      });
  };

  componentDidMount() {
    this.apiCall();
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Scavenger Hunt!</h1>
          <form onSubmit={this.searchHandler}>
            <input type="file" /><input type="submit" value="Search with file" /><br/>
            <input type="text" placeholder="Image URL here!" /><input type="submit" value="Search with URL" />
          </form>
        </header>
        <Tags tags={this.state.tags}/>
      </div>
    );
  }
}

export default App;
