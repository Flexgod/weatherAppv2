var express = require('express');
var router = express.Router();
var https = require('https');
let api_key = process.env.DARK_SKY_API_KEY
let urlreq = 'https://api.darksky.net/forecast/'+api_key+'/6.5244,3.3792';

/* GET home page. */
router.get('/', function (req, response, next) {
  response.render('index', {Temperature: '2', Currently: 'icon'});
  console.log('port value is: '+ process.env);
});
/* Route to Get Error page */
router.get('/error', function(req, res){
  res.render('error');
});
/* Route handler to seach for city logitude and latitude */
router.post('/', function(req, response, next){
  let cityWeather = req.body.city;
  response.render('weather', { city: cityWeather });
});

module.exports = router;
