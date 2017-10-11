// Set up Variables
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
function weatherReporter(lati, longi) {
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
            let list = { tempInCelcius, windSpeed, humidity, icon};
            console.log(humidity);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

module.exports.weatherReporter = weatherReporter;
module.exports.cityGeolocation = cityGeolocation;