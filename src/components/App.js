import React, { Component } from 'react';
import '../styles/App.css';
import Checker from './Checker.js';
import Header from './Header';

// Clarifai client - works in browsers via Browserify
const Clarifai = require('clarifai');

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
      goals: [
        'library',
        'park',
        'rabbit',
        'restaurant',
        'skyscraper',
        'strawberry',
        'tibetan spaniel'
      ],
      goal: '',
      searching: false,
      searched: false,
      searchingMessage: "Hold on! I'm thinking!",
      image: '',
      finished: false,
      finishedMessage: "You've won! Three cheers for you, gov'nah!"
    };

    this.randomGoal = this.randomGoal.bind(this);
  }

  componentDidMount() {
    this.randomGoal(this.state.goals.length);
  }

  randomGoal(remainingGoals) {
    console.log('new goal');
    if (remainingGoals !== 0) {
      let choice = Math.floor(Math.random() * remainingGoals);
      this.setState(state => ({
        goal: state.goals[choice]
      }));
      setTimeout(() => {
        this.setState(state => ({
          goals: this.state.goals
            .slice(0, choice)
            .concat(this.state.goals.slice(choice + 1))
        }));
        console.log(this.state.goals);
      }, 2000);
    } else {
      console.log('finished!');
      this.setState({
        finished: true
      });
    }
  }

  searchHandler = event => {
    event.preventDefault();

    // Arrow function - `this` will be `App`
    // const fileAppSetState = base64 => {
    //   // Correct `this`!!
    //   // console.log('`this` is App: ', this);
    //   this.setState({
    //     url: { base64: base64 },
    //     image: 'data:image/jpeg;base64, ' + base64
    //   });
    // };

    // Non-arrow function - `this` will NOT be `App`
    // function fileAppSetState(base64) {
    // console.log('non-arrow: ', this); // `this` is `undefined`

    // this.setState({
    //   url: { base64: base64 },
    //   image: 'data:image/jpeg;base64, ' + base64
    // });
    // }

    // IF IMAGE IS A URL
    if (this.urlInput.value) {
      // console.log('urlInput.value: ', this.urlInput.value');
      this.setState({
        url: this.urlInput.value,
        image: this.urlInput.value
      });
    }

    // IF IMAGE IS A FILE
    else if (this.fileInput.files[0]) {
      // Fetch first file in the node's file list
      const file = this.fileInput.files[0];
      console.log('fileInput: ', file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      const convertBase64 = response => {
        // console.log(reader.result);
        // response.target = reader.result
        const base64 = response.target.result.split('base64,')[1];
        console.log({ base64 });

        console.log('convertBase64 - this: ', this);

        // If convertBase64() is NOT an arrow function,
        // `this` is FileReader, so you can NOT do this.setState here!!
        // So create an arrow function inside searchHandler(), e.g. fileAppSetState(), and call it.
        // e.g. fileAppSetState(base64);
        // Why is `this` FileReader? Is it because convertBase64() is the onload handler,
        // and onload is a method of `reader`, and `reader` is an instance of FileReader?

        // If convertBase64() IS an arrow function, `this` will be App.
        // So we CAN do this.setState() here.

        this.setState({
          url: { base64: base64 },
          image: 'data:image/jpeg;base64, ' + base64
        });
      };

      // Use `onload` bc FileReader is async
      reader.onload = convertBase64;

      reader.onerror = function(error) {
        console.log('Error: ', error);
      };
    }

    this.searchMessage();

    event.currentTarget.reset();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url && this.state.url) {
      console.log('current url state: ' + this.state.url);
      this.apiCall();
    }
  }

  apiCall = () => {
    console.log('called');
    app.workflow
      .predict('trainedTibetanSpaniel', this.state.url)
      .then(response => {
        console.log({ response });
        var concepts = response.results[0].outputs[0].data.concepts;
        console.log(
          response.results[0].outputs[1].data.concepts[0].value > 0.05
        );
        if (response.results[0].outputs[1].data.concepts[0].value > 0.85) {
          console.log(response.results[0].outputs[1].data.concepts[0]);
          concepts = [
            ...concepts,
            response.results[0].outputs[1].data.concepts[0]
          ];
        }
        console.log({ concepts });
        const names = concepts.map(elm => elm.name);
        console.log({ names });
        return names;
      })
      .then(names => {
        this.setState({ tags: names });
      })
      .then(data =>
        this.setState({
          searching: false,
          url: '',
          searched: true
        })
      );
  };

  searchMessage = () => {
    this.setState({
      searching: true
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          submit={this.searchHandler}
          fileInputRef={input => (this.fileInput = input)}
          urlInputRef={input => (this.urlInput = input)}
        />

        <main>
          {this.state.finished ? (
            <span id="goal-message">{this.state.finishedMessage}</span>
          ) : (
            <span id="goal-message">You need to find a {this.state.goal}</span>
          )}

          {this.state.searching && <span>{this.state.searchingMessage}</span>}
          {!this.state.searching && this.state.searched && (
            <Checker
              tags={this.state.tags}
              goal={this.state.goal}
              randomGoal={this.randomGoal}
              remainingGoals={this.state.goals.length}
            />
          )}

          {this.state.image && (
            <div id="searched-image">
              <img
                alt="your find"
                src={this.state.image}
                id="searched-image-img"
              />
            </div>
          )}
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
