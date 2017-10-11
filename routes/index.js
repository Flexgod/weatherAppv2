var express = require('express');
var router = express.Router();
//Require the Weather Controller file.
let weatherController = require('../controller/weather');
//Set Default home city name
let cityName = 'Lagos, Nigeria';
let lati = 42.3601;
let longi = -71.0589;
/* GET home page. */
router.get('/', function (req, response, next) {
  weatherController.weatherReporter(lati, longi);
  response.render('index', { city: cityName });
});
/* Route to Get Error page */
router.get('/error', function (req, res) {
  res.render('error');
});
/* Route handler to seach for city logitude and latitude */
router.post('/', function (req, response, next) {
  let cityName = req.body.city;
  //Call detect city geo location function here.
  weatherController.cityGeolocation(cityName);
  response.render('weather', { city: cityWeather });
});

module.exports = router;
