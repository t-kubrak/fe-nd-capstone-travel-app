const dotenv = require('dotenv');
dotenv.config();
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/trip', async function (req, res) {
    const geoNamesEndpoint = `http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=1&username=${process.env.GEONAMES_API_USERNAME}`;

    try {
        const geoNamesRes = await fetch(encodeURI(geoNamesEndpoint), {
            method: 'GET',
        });
        let jsonRes = await geoNamesRes.json();
        const lng = jsonRes.geonames[0].lng;
        const lat = jsonRes.geonames[0].lat;

        const weatherbitEndpoint = `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`;

        const weatherbitRes = await fetch(encodeURI(weatherbitEndpoint), {
            method: 'GET',
        });
        jsonRes = await weatherbitRes.json();
        const description = jsonRes.data[0].weather.description;
        const temp = jsonRes.data[0].temp;

        const pixabayEndpoint = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}=${req.body.city}&category=places`
        const pixabayRes = await fetch(encodeURI(pixabayEndpoint), {
            method: 'GET',
        });
        jsonRes = await pixabayRes.json();
        const imageUrl = jsonRes.hits[0].webformatURL;
        console.log(imageUrl);
        res.send(jsonRes);
    } catch (error) {
        console.log("error", error);
    }

    res.send();
})



