import React, { Component } from 'react';
import Checker from './Checker.js';

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
        <Checker goal={this.props.goal} tags={this.props.tags} />
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

/* SOLUTIONS
Strawberry: https://cdn1.medicalnewstoday.com/content/images/articles/271/271285/three-strawberries.jpg
Restaurant: https://media-cdn.tripadvisor.com/media/photo-s/11/45/43/2c/restaurant-by-night.jpg
Library: https://www.sipri.org/sites/default/files/styles/body_embedded/public/2018-01/dsc_0155_1.jpg?itok=S1ACqEI_
Park: https://louisvilleky.gov/sites/default/files/styles/park_header_image/public/parks/park_event_images/black_mudd_web_header.jpg?itok=ZjuDMGwm
Skyscraper: https://static.dezeen.com/uploads/2018/01/london-skyline-city-hall-2364-hero-852x479.jpg
Rabbit: https://thumbs-prod.si-cdn.com/8YALUERgmKz9lljsbFGCk9Ax1lM=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/70/e0/70e0989e-646e-4537-ae8e-7bbf863db2fd/ebjj1g.jpg
Tibetan Spaniel: https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12223538/Tibetan-Spaniel-On-White-01.jpg
*/
