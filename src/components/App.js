import React, { Component } from 'react';
import '../styles/App.css';
import Tags from './Tags.js';
import Checker from './Checker.js';

const Clarifai = require("clarifai");

// Clarifai instance
const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      tags: [],
      goal: "tibetan spaniel",
      searching: false,
      searchingMessage: "Hold on! I'm thinking!"
    }
  }

  searchHandler = (event) => {
    event.preventDefault();

    const searchHandlerCorrectThis = (base64) => {
      // Correct this!!
      // console.log('`this` is App: ', this);
      this.setState({ url: {'base64': base64} })
    }

    // IF IMAGE IS A URL
    if (this.urlInput.value) {
      // console.log("urlInput.value:" + this.urlInput.value);
      this.setState({ url: this.urlInput.value });
    }
    
    // IF IMAGE IS A FILE
    else if (this.fileInput.files[0]) {
      // Fetch first file in the node's file list
      const file = this.fileInput.files[0];
      console.log('fileInput:', this.fileInput.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      function convertBase64(response) {
        // console.log(reader.result);
        // response.target = reader.result
        const base64 = response.target.result.split("base64,")[1];
        console.log({ base64 });
        searchHandlerCorrectThis(base64);

        console.log('this: ', this); // `this` is FileReader!! 
        // Because convertBase64 is onload, and online is a method of reader, and reader is an instance
        // of FileReader. So you can't do this.setState here!!
      };

      // Use `onload` bc FileReader is async
      reader.onload = convertBase64;
      
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    }
    
    this.searchMessage();
    event.currentTarget.reset();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url && this.state.url){
      console.log("current url state: " + this.state.url);
      this.apiCall();
    }
  }

  apiCall = () => {
    console.log("called")
    app.workflow.predict('trainedTibetanSpaniel', 
    this.state.url)
    .then(response => {
      console.log({response}) 
      var concepts = response.results[0].outputs[0].data.concepts
      console.log(response.results[0].outputs[1].data.concepts[0].value > .05)
      if (response.results[0].outputs[1].data.concepts[0].value > .05){
        console.log(response.results[0].outputs[1].data.concepts[0])
          concepts= [...concepts, response.results[0].outputs[1].data.concepts[0]]
      }
      console.log({ concepts });
      const names = concepts.map(elm => elm.name); 
      console.log({ names });
      return names;
    })
    .then( names => {
      this.setState({ tags: names });
    }).then(data => this.setState({
      searching: false,
      url: ''
    }))};

    searchMessage = () => {
      this.setState({
        searching: true,
      })
    }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Scavenger Hunt!</h1>
          <form onSubmit={this.searchHandler}>
            <input 
              type="file" 
              accept='image/png, image/jpeg'
              ref={ (fileInput) => this.fileInput = fileInput }
              />
            <input type="submit" value="Search with file" /><br/>
            <input type="text" placeholder="Image URL here!" ref={(input) => this.urlInput = input} />
            <input type="submit" value="Search with URL" />
          </form>
        </header>
        {this.state.searching && <span>{this.state.searchingMessage}</span>}
        <Checker tags={this.state.tags} goal={this.state.goal}/>
      </div>
    );
  }
}

export default App;
