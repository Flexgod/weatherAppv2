// Set up Variables
//Require Json Geolocation Store
const cityJson = require('../data/cities.json');
const https = require('https');
let apiKey = process.env.DARK_SKY_API_KEY;
let apiUrl = 'https://api.darksky.net/forecast/';

// =================================================
//Weather Reporter
// =================================================
function weatherReporter(lati, longi, callback) {
    let api_call = apiUrl + apiKey + "/" + lati + "," + longi;
    //Call DarkSkyApi to report weather for location
    var body = "";
    var req = https.request(api_call, (res) => {
        res.on('data', (d) => {
            body += d;
        });
        res.on('end', () => {
            var data = JSON.parse(body);
            // =================================================
            // Temperature Converter from fahrenheit to celcius
            // =================================================
            var tempInCelcius = ((data.currently.apparentTemperature - 32) * (5 / 9));
            tempInCelcius = Math.round(tempInCelcius);
            var windSpeed = data.currently.windSpeed;
            var humidity = ((data.currently.humidity) * 100);
            var icon = data.currently.summary;
            let list = { tempInCelcius, windSpeed, humidity, icon };
            return callback(list);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}
//CREATE A FUNCTION TO CALL Home page Weather WEATHER
function indexWeather(req, res) {
    //Set Default home city name
    let cityName = 'Lagos, Nigeria';
    let lati = 42.3601;
    let longi = -71.0589;
    weatherReporter(lati, longi, function (response) {
        console.log(response.tempInCelcius);
        res.render('index', { city: cityName, cityTemp: response.tempInCelcius });
    });
}
//Function to hanfle the searched city weather
function searchCityWeather(req, res) {
    //Validate User Inout isnt empty
    let cityNameSearch = req.body.city;
    //Check if city exists in the JSON data Store
    let cityS = cityJson.cities.find(item => item.name === cityNameSearch);
    //if city is not found
    if (!cityS) {
        console.log('No city Found');
        //No city found display errors
        res.redirect('/');
    } else {
        //city is found get the goecode and get weather
        console.log(cityS);
        let lati = cityS.lat;
        let longi = cityS.lng;
        let cityName = cityS.name;
        let cityCountry = cityS.country;
        weatherReporter(lati, longi, function (response) {
        console.log(response.tempInCelcius, cityName, cityCountry);
        res.render('weather', { city: cityName, cityTemp: response.tempInCelcius, cityCountry: cityCountry });
        });
    }
}
module.exports.indexWeather = indexWeather;
module.exports.searchCityWeather = searchCityWeather;
module.exports.cityGeolocation = cityGeolocation;