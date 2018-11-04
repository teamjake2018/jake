import React, { Component } from "react";

// const Clarifai = require("clarifai");

// Clarifai instance
// const app = new Clarifai.App({
//   apiKey: process.env.REACT_APP_API_KEY
// });

class Tags extends Component {
  render() {
    return (
      <div className="tags-container">
        <TagsList tags={this.props.tags} />
      </div>
    );
  }
}

const TagsList = props => {
  return props.tags.map((elm, i) => <TagsItem elm={elm} key={i} />);
};

const TagsItem = props => {
  return <div className="tags-item">{props.elm}</div>;
};

export default Tags;

  // getModel = () => {
  //   return app.models.initModel({
  //     id: Clarifai.GENERAL_MODEL,
  //     version: "aa7f35c01e0642fda5cf400f543e7c40"
  //   })
  // }

  // getPrediction = () => {
  //   return this.getModel().then(generalModel => {
  //     return generalModel.predict(this.state.url);
  //   })
  // }
