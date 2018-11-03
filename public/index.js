const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: process.env.API_KEY
   });

   app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
        .then(generalModel => {
          return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
        })
        .then(response => {
          var concepts = response['outputs'][0]['data']['concepts'];
          console.log(concepts);
        })