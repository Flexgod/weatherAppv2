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
router.post('/', weatherController.searchCityWeather);

module.exports = router;
