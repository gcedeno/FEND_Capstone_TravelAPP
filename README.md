# Project Overview

- [Project Instructions](#project-instructions)
- [Development & Use](#development)
- [Running with the 3-Party-APIs](#running)
- [Extend Options](#extend-options)

## Project Instructions

Project `FEND Capstone - Travel App`. 
This project requires to build out a travel app that, obtains a desired trip location
 & date from the user, and displays weather and an image of the location using information 
 obtained from external APIs. The project contains webpack configurations, 
 express server which connect to 3-Party-APIs to get the necessary data.

The goal of this project is to get practice with:

- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls
- all learned techniques

## Development & Use
1. Install all the dependencies runnig `npm i `.
2. For development environment to get webpack running and build the dist
folder run the command `npm run dev`;
4. For production `npm run build`;
5. Finally you can run `npm start` to have hot loading of the project as 
well as a working express environment.



## Running with the 3-Party-APIs

To run the server with the 3-Party-APIs you need an API Key or username and a
baseUrl in an .env file. `GEO_BASEURL` and `GEO_USERNAME` for the Geonames API,
`Weatherbit_APIKEY` and `Weatherbit_BASEURL` for the Weatherbit API & `PIXABAY_KEY` 
and `PIXABAY_BASEURL` for the Pixabay API

Now jus enter your current location, desired destination, trip dates and search for 
important details about your next travel adventure! 

## References
* [Udacity's Front End Developer ND](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011)
* [Geonames Documenation](https://www.geonames.org/export/JSON-webservices.html)
* [npm geonames](https://www.npmjs.com/package/geonames.js)
* [PIXABAY API documentation](https://pixabay.com/api/docs/)
* [HTML <fieldset> Tag](https://www.w3schools.com/tags/tag_fieldset.asp)
* [Checking if a fetch response is a JSON Object](https://stackoverflow.com/questions/37121301/how-to-check-if-the-response-of-a-fetch-is-a-json-object-in-javascript)
* [Webpack Documenation](https://webpack.js.org/concepts/#loaders)
* [Sass Basics](https://sass-lang.com/guide)
* [Jest Tutorial](https://www.valentinog.com/blog/jest/)
* [Google Fonts](https://fonts.google.com/specimen/Open+Sans?selection.family=Open+Sans:ital,wght@0,400;1,600&sidebar.open)
* [Package.json warning in vscode](https://github.com/Microsoft/vscode-react-native/issues/151)
* [Fixing CORS error](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)
* [Understanding Data & Time in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript)
