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
        const apiRes = await fetch(encodeURI(geoNamesEndpoint), {
            method: 'POST',
        });
        const jsonRes = await apiRes.json();
        console.log(jsonRes.geonames[0].lng);
        console.log(jsonRes.geonames[0].lat);
        res.send(jsonRes);
    } catch (error) {
        console.log("error", error);
    }

    res.send();
})



