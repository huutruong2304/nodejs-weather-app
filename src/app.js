// const request = require('request');
const express = require('express');
const path = require('path')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const fetch = require('node-fetch')


const app = express();
const port = process.env.PORT || 3000;


//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    // console.log(req.query.loc);

    res.render('index', {
        title: 'Weather',
        name: 'Nguyễn Hữu Trường',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location!'
        });
    }
    geocode(req.query.location, (err, { latitude, longtitude, location } = {}) => {
        if (err) {
            return res.send({ err });
        }
        // res.send({latitude,longtitude});

        forecast(latitude, longtitude, (err, forecastData) => {
            if (err) {
                return res.send({ err });
            }
            res.send({
                forecast: forecastData.summary + '. It is currently ' + forecastData.temperature + ' degrees out. There is  a ' + forecastData.precipProbability + '% chance of rain.',
                location: location
            });

        });
    });

    // res.send({
    //     country: 'viet nam',
    //     location: req.query.location
    // });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nguyễn Hữu Trường'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nguyễn Hữu Trường'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error!',
        name: 'Nguyễn Hữu Trường'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error!',
        name: 'Nguyễn Hữu Trường'
    })
})

app.listen(port, () => {
    console.log('Server is up to port ' + port);
});

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'))
// // console.log(__filename)