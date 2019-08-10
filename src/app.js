const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();

// define path for express config
const publicDir = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials/');

// setup handlebars engine and views location
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Asad Zeynalov'
    });

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Asad Zeynalov'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help Message',
        title: 'Help',
        name: 'Asad Zeynalov'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (err, {long, lat, location} = {}) => {
        if (err) {
            return res.send({error: err})
        }

        forecast(lat, long, (err, message) => {
            if (err) {
                return res.send({error: err})
            }
            res.send({
                forecast: message,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article 404',
        name: 'Asad Zeynalov',
        errorMessage: 'Help Article Not Found!'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Asad Zeynalov',
        errorMessage: 'Page Not Found!'
    });
})

const port = 4000;

app.listen(port, () => {
    console.log('Server running on port 4000');
});