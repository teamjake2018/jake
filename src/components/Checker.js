import React, { Component } from 'react';
import logo from '../static/logo.svg';
import '../styles/App.css';
import Tags from './Tags.js';

export default class Checker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: 'You found it! Good job Colombo!',
      failureMessage: "That's not quite what I was asking for, Mr. Magoo!",
      displayMessage: ''
    };
    this.checker = this.checker.bind(this);
  }

  checker() {
    console.log('goals: ' + this.props.goal);
    console.log('tags: ' + this.props.tags);
    for (let i = 0; i < this.props.tags.length; i++) {
      if (this.props.goal == this.props.tags[i]) {
        console.log('goals: ' + this.props.goal);
        console.log('tags: ' + this.props.tags[i]);
        this.setState({ displayMessage: this.state.successMessage });
        this.props.randomGoal(this.props.remainingGoals);
        break;
      }
      this.setState({ displayMessage: this.state.failureMessage });
    }
  }

  render() {
    return (
      <div id="checker">
        <button onClick={this.checker}>CHECK</button>
        <p>{this.state.displayMessage}</p>
      </div>
    );
  }
}
