// Set up Variables
//Require Json Geolocation Store
const cityJson = require('../data/location.json');
const https = require('https');
let apiKey = process.env.DARK_SKY_API_KEY;
let apiUrl = 'https://api.darksky.net/forecast/';
let googleKey = process.env.GOOGLE_API_KEY;
// =================================================
//Geolocation Detector from city name to Geo code
// =================================================
function cityGeolocation(city) {
    /*Call google Places API here
    get the Location of the place and call the weather reporter function
    */
    let googleApiCall = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + googleKey;
    var request = https.request(googleApiCall, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log(body);
        } else {
            console.log(err);
        }
    });
}
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
    let cityS = cityJson.cities.find(item => item.cityName === cityNameSearch);
    if (cityS.cityName !== cityNameSearch) {
        console.log('No city Found');
    } else {
        console.log(cityS);
        res.redirect('/');
    }
    //Call the goecode api to get the location
    //then call the weeather with this!
}
module.exports.indexWeather = indexWeather;
module.exports.searchCityWeather = searchCityWeather;
module.exports.cityGeolocation = cityGeolocation;