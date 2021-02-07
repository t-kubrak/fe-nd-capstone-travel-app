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
    const city = req.body.city;
    let date = req.body.date;
    const geoNamesEndpoint = `http://api.geonames.org/searchJSON?username=${process.env.GEONAMES_API_USERNAME}&q=${city}&maxRows=1`;

    try {
        // Get coordinates
        const geoNamesRes = await fetch(encodeURI(geoNamesEndpoint), {
            method: 'GET',
        });
        let jsonRes = await geoNamesRes.json();
        const lng = jsonRes.geonames[0].lng;
        const lat = jsonRes.geonames[0].lat;

        // Show current weather if trip date is withing a week,
        // otherwise get daily forecast for 16 days
        let dateForNextWeek = new Date();
        const nextWeekDate = (new Date()).getDate()+7;
        dateForNextWeek.setDate(nextWeekDate);

        const isTripWithinWeek = dateForNextWeek.getTime() >= (new Date(date)).getTime();
        const forecast = isTripWithinWeek ? 'current' : 'forecast/daily';

        const weatherbitEndpoint = `http://api.weatherbit.io/v2.0/${forecast}?&key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lng}`;

        const weatherbitRes = await fetch(encodeURI(weatherbitEndpoint), {
            method: 'GET',
        });
        jsonRes = await weatherbitRes.json();

        let weatherDesc = '';
        let temperature = '';

        // Show current weather
        if (isTripWithinWeek) {
            console.log('Current weather:')
            weatherDesc = jsonRes.data[0].weather.description;
            temperature = jsonRes.data[0].temp;
        } else {
            const dailyForecast = jsonRes.data;

            // Compare dates and show the forecast for correct one
            for (const day of dailyForecast) {
                const isTripDay = (new Date(day.datetime)).getTime() === (new Date(date)).getTime();
                console.log(isTripDay);
                if (isTripDay) {
                    console.log(`Forecast for day: ${day.datetime}`);
                    date = day.datetime;
                    weatherDesc = day.weather.description;
                    temperature = day.temp;
                    break;
                }
            }

            // If date is not within 16 days range(API limitations), that just show the last one
            if (!weatherDesc) {
                const lastDayForecast = dailyForecast[dailyForecast.length - 1];
                console.log(`Latest possible forecast for day: ${lastDayForecast.datetime}`);
                date = lastDayForecast.datetime;
                weatherDesc = lastDayForecast.weather.description;
                temperature = lastDayForecast.temp;
            }
        }

        // Get image url
        const pixabayEndpoint = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${city}`
        const pixabayRes = await fetch(encodeURI(pixabayEndpoint), {
            method: 'GET',
        });
        jsonRes = await pixabayRes.json();
        const imageUrl = jsonRes.hits[0].webformatURL;

        res.send({city, date, weatherDesc, temperature, imageUrl});
    } catch (error) {
        console.log("error", error);
        res.status(500)
        res.send();
    }
})



