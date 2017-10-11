// Set up Variables
const https = require('https');
let apiKey = process.env.DARK_SKY_API_KEY;
let apiUrl = 'https://api.darksky.net/forecast/';
let googleKey = process.env.GOOGLE_API_KEY;
// =================================================
// Temperature Converter
// =================================================
// convert degrees in fahrenheit to celsius
function fToC(fahrenheit) {
    var fTemp = fahrenheit,
        fToCel = (fTemp - 32) * 5 / 9;
    return fToCel;
}
// =================================================
//Geolocation Detector
// =================================================
function cityGeolocation(city) {
    /*Call google Places API here
    get the Location of the place and call the weather reporter function
    */
    let googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + googleKey;
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
            var data = body;
            console.log(data);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.end();
}

module.exports.weatherReporter = weatherReporter;
module.exports.cityGeolocation = cityGeolocation;