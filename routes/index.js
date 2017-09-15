var express = require('express');
var router = express.Router();
var https = require('https');
let urlreq = 'https://api.darksky.net/forecast/65a5831e7994574a932d16fe38636707/6.5244,3.3792';

/* GET home page. */
router.get('/', function (req, response, next) {
  https.get(urlreq, function (res) {
    var info = '';
    res.on("data", function (chunk) {
      info += chunk;
    });
    res.on("end", function () {
      if (res.statusCode === 200) {
        try {
          const data = JSON.parse(info);
          //Display Weather for Lagos Nigeria
          //Convert from Farenheit to Celcius
          var tempInCelcius = ((data.currently.apparentTemperature - 32) * (5 / 9));
          tempInCelcius = Math.round( tempInCelcius);
          var windSpeed = data.currently.windSpeed;
          var humidity = ((data.currently.humidity) * 100);
          var icon = data.currently.summary;
          response.render('index', {Temperature: tempInCelcius, Currently: icon});
        } catch (error) {
          console.log("The following error(s) occrured: " + error);
        }
      } else {
        console.log("Something went wrong!");
        response.redirect('/error');
      }
    });
  });
});
router.get('/error', function(req, res){
  res.render('error');
})

module.exports = router;
