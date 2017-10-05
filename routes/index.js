var express = require('express');
var router = express.Router();
var https = require('https');
let urlreq = 'https://api.darksky.net/forecast/65a5831e7994574a932d16fe38636707/6.5244,3.3792';

/* GET home page. */
router.get('/', function (req, response, next) {
  response.render('index', {Temperature: '2', Currently: 'icon'});
});
router.get('/error', function(req, res){
  res.render('error');
})

router.post('/', function(req, response, next){
  let cityWeather = req.body.city;
  response.render('weather', { city: cityWeather });
})

module.exports = router;
