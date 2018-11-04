import React, { Component } from "react";

// const Clarifai = require("clarifai");

// Clarifai instance
// const app = new Clarifai.App({
//   apiKey: process.env.REACT_APP_API_KEY
// });

class Tags extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tags: []
  //   };
  // }

  // apiCall = () => {
  //   app.models
  //     .initModel({
  //       id: Clarifai.GENERAL_MODEL,
  //       version: "aa7f35c01e0642fda5cf400f543e7c40"
  //     })
  //     .then(generalModel => {
  //       return generalModel.predict(
  //         "https://samples.clarifai.com/metro-north.jpg"
  //       );
  //     })
  //     .then(response => {
  //       var concepts = response["outputs"][0]["data"]["concepts"];
  //       console.log({ concepts });
  //       const names = concepts.map(elm => elm.name);
  //       console.log({ names });
  //       return names;
  //     })
  //     .then( names => {
  //       this.setState({ tags: names });
  //     });
  // };

  // componentDidMount() {
  //   this.apiCall();
  // }

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
