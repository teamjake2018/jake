import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';

var api_key = process.env.REACT_APP_API_KEY

var app = new Clarifai.App({
  apiKey: api_key
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

  searchHandler = (event) => {
    event.preventDefault();
    console.log("Searching!");
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
      </div>
    );
  }
}

export default App;
