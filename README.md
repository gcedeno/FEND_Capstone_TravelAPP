# Project Overview

- [Project Instructions](#project-instructions)
- [Development](#development)
- [Running with the 3-Party-APIs](#running)
- [Extend Options](#extend-options)

## Project Instructions

Project `FEND Capstone - Travel App`. The project
contains webpack configurations, express server which connect to 3 different
3-Party-APIs to get the necessary data.

The goal of this project is to get practice with:

- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls
- all learned techniques

## Development

Install all the dependencies runnig `npm i `.To get webpack running and build the dist
folder, run `npm run build-dev`.
Once that is created you can run `npm start` to have hot loading of the project as 
well as a working express environment.



## Running with the 3-Party-APIs

To run the server with the 3-Party-APIs you need an API Key or username and a
baseUrl in an .env file. `GEO_BASEURL` and `GEO_USERNAME` for the Geonames API,
`OpenWeather_APIKEY` and `OpenWeather_BASEURL` for the DarkSky API & `PIXABAY_KEY` and
`PIXABAY_BASEURL` for the Pixabay API

Now you're able to run the server with the 3-Party-APIs to everything you need
for the Trip planning.

## Extend Options

The extend options which was implemented is the remove a trip functionality

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
