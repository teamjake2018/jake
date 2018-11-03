import React, { Component } from 'react';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'b3300620696b4d859b5a0fb073f83bc4'
});

// Naughty global variable - remove later
let tagsArr = [];

app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts'];
        console.log({ concepts });
        const names = concepts.map( (elm) => elm.name);
        console.log({ names });
        
        // tagsArr = [...names];
        names.forEach( elm => tagsArr.push(elm));
        // tagsArr.push(...names);
        console.log('tags inside: ', tagsArr);
      })

console.log('tags outside: ', tagsArr);

export default class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: tagsArr
        }
    }

    // methods

    render() {
        return (
            <div className='tags-container'>
              <TagsList 
                tags={this.state.tags} />
            </div>
        );
    }
}

class TagsList extends Component {
    render(){
    return (
        this.props.tags.map( (elm, i) => 
            <TagsItem
                elm={elm}
                key={i} />
        )
    );
}
}

class TagsItem extends Component {
    render(){
    return (
        <div className='tags-item'>
        {this.props.elm}
        </div>
    );
}
};