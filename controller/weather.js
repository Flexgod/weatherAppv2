// Set up Variables
// Require Json Geolocation Store
const cityJson = require('../data/cities.json');
const https = require('https');

const apiKey = process.env.DARK_SKY_API_KEY;
const apiUrl = 'https://api.darksky.net/forecast/';

// =================================================
// Weather Reporter
// =================================================
function weatherReporter(lati, longi, callback) {
  const apiCall = `${apiUrl + apiKey}/${lati},${longi}`;
  // Call DarkSkyApi to report weather for location
  let body = '';
  const req = https.request(apiCall, (res) => {
    res.on('data', (d) => {
      body += d;
    });
    res.on('end', () => {
      const data = JSON.parse(body);
      // =================================================
      // Temperature Converter from fahrenheit to celcius
      // =================================================
      let tempInCelcius = ((data.currently.apparentTemperature - 32) * (5 / 9));
      tempInCelcius = Math.round(tempInCelcius);
      const country = data.timezone;
      const { windSpeed } = data.currently;
      const humidity = ((data.currently.humidity) * 100);
      const icon = data.currently.summary;
      const list = {
        tempInCelcius, windSpeed, humidity, icon, country,
      };
      return callback(list);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}
// CREATE A FUNCTION TO CALL Home page Weather WEATHER
function indexWeather(req, res) {
  // Set Default home city name
  const cityName = 'Lagos, Ng';
  const lati = 6.45407;
  const longi = 3.39467;
  weatherReporter(lati, longi, (response) => {
    res.render('index', {
      city: cityName,
      cityTemp: response.tempInCelcius,
      cityWindSpeed: response.windSpeed,
      cityHumidity: response.humidity,
      cityIcon: response.icon,
    });
  });
}
// Function to hanfle the searched city weather
function searchCityWeather(req, res) {
  // Validate User Inout isnt empty
  // Geo COde from Our JSON Object List
  let str = req.body.city;
  str = str.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
  const cityNameSearch = str;
  // Check if city exists in the JSON data Store
  const cityS = cityJson.cities.find(item => item.name === cityNameSearch);
  // if city is not found
  if (!cityS) {
    console.log('No city Found');
    // No city found display errors
    res.redirect('/error');
  } else {
    // city is found get the goecode and get weather
    console.log(cityS);
    const lati = cityS.lat;
    const longi = cityS.lng;
    const cityName = cityS.name;
    const cityCountry = cityS.country;
    weatherReporter(lati, longi, (response) => {
      res.render('weather', {
        city: cityName,
        cityTemp: response.tempInCelcius,
        cityCountry,
        cityWindSpeed: response.windSpeed,
        cityHumidity: response.humidity,
        cityIcon: response.icon,
      });
    });
  }
}

// API HANDLER FOR REACT APP

//  Function to hanfle the searched city weather
function searchCityWeatherAPI(req, res) {
  // Validate User Inout isnt empty
  //  city is found get the goecode and get weather
  const lati = req.params.lat;
  const longi = req.params.lng;
  weatherReporter(lati, longi, (response) => {
    res.json(response);
  });
}

module.exports.searchCityWeatherAPI = searchCityWeatherAPI;
module.exports.indexWeather = indexWeather;
module.exports.searchCityWeather = searchCityWeather;
