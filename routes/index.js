const express = require('express');

const router = express.Router();
//  Require the Weather Controller file.
const weatherController = require('../controller/weather');

/* GET home page. */
router.get('/', weatherController.indexWeather);
/* Route to Get Error page */
router.get('/error', (req, res) => {
  res.render('error');
});
/* Route handler to seach for city logitude and latitude */
router.post('/', weatherController.searchCityWeather);

router.get('/api/:lat/:lng', weatherController.searchCityWeatherAPI);

module.exports = router;
