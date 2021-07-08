const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=24cb2a48527d4d10e6d348a59979abb1&query=${long},${lat}`;
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback(
        console.log(
          'There seems to be an error with, probably, your internet',
          undefined
        )
      );
    } else if (body.error) {
      callback(`Location invalid. Lat: ${lat}, Long: ${long}`, undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out and it feels like ${body.current.feelslike} degrees. And also it is ${body.current.weather_descriptions[0]}`
      );
    }
  });
};

module.exports = forecast;
