const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './views');
const partialsPath = path.join(__dirname, './partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'r1cemilk',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'r1cemilk',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    msg: 'This is a message',
    name: 'r1cemilk',
  });
});

app.get('/help/*', (req, res) => {
  res.render('notfound', {
    errorType: '404',
    msg: 'Arcticle not found',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided',
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }

      res.send({ forecast: forecastData, address: req.query.address });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('notfound', {
    title: '404',
    msg: 'Page not found',
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
