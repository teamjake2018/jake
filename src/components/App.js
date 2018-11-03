import React, { Component } from 'react';
import logo from '../static/logo.svg';
import '../styles/App.css';
import Tags from './Tags.js';

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
        <Tags/>
      </div>
    );
  }
}

export default App;
