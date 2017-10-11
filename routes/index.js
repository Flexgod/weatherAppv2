var express = require('express');
var router = express.Router();
//Require the Weather Controller file.
let weatherController = require('../controller/weather');

/* GET home page. */
router.get('/', weatherController.indexWeather);
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
