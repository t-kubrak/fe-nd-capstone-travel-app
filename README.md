# Travel planner app

This app finds weather conditions and image for the user's trip destination
using city name and date of arrival.

This is a capstone project of the
[Front End Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011) program by Udacity.

The following topics has been covered:

- HTML, CSS, JavaScript, DOM and Events
- Node and Express
- Webpack, Babel and Sass
- API integration
- Testing using Jest
- Offline functionality using service workers

## Installation
1. Install [Node](https://nodejs.org/en/).
2. `npm install`
3. Rename `.env-example` to `.env` and add your API credentials. This project relies on the following APIs:
   - [Geonames](http://www.geonames.org) to get coordinates
   - [Weatherbit](https://www.weatherbit.io/) to get weather data by coordinates
   - [Pixabay](https://pixabay.com) to get an image
4. `npm run build-prod` to bundle our assets for production mode
5. `npm start` to start the server

Note: this app runs on localhost:8081, but you can change this in `/server/index.js`

### To use this app for development purposes:
1. `npm run build-dev` to start webpack dev server which runs on localhost:8080
2. Open another terminal and enter `npm start`, so that we can use our express server endpoints.