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
    console.log(this.urlInput.value);
    this.setState({ url: this.urlInput.value });

    this.apiCall();

    event.currentTarget.reset();
  }

  apiCall = () => {
    console.log("called")
    app.workflow.predict('trainedTibetanSpaniel', 
    "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12223538/Tibetan-Spaniel-On-White-01.jpg")
    .then(response => {
      console.log(response) 
      var concepts = response.results[0].outputs[0].data.concepts
      var moreConcepts = concepts.concat(response.results[0].outputs[1].data.concepts);
      console.log({ moreConcepts });
      const names = moreConcepts.map(elm => elm.name); 
      console.log({ names });
      return names;
    })
    .then( names => {
      this.setState({ tags: names });
    })};

  /* This is the old API call and is being kept around just incase I missed something in my manual merge. But it should be unncessary now.
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
  };*/

  // componentDidMount() {
  //   this.apiCall();
  // }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Scavenger Hunt!</h1>
          <form onSubmit={this.searchHandler}>
            <input type="file" />
            <input type="submit" value="Search with file" /><br/>
            <input type="text" placeholder="Image URL here!" ref={(input) => this.urlInput = input} />
            <input type="submit" value="Search with URL" />
          </form>
        </header>
        <Tags tags={this.state.tags}/>
      </div>
    );
  }
}

export default App;
