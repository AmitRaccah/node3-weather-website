const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name: 'AR'
    })

})

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About Us!',
        name: 'AR'

    })

})

app.get('/help', (req, res) => { 
    res.render('help', {
        title: 'Help Page!',
        name: 'AR',
        helpMessage: 'HELP!'

    })

})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'AR',
        errorMessage: 'Help page was not found'
    })
    
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404 Page!',
        name: 'AR',
        errorMessage: 'About page was not found'
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'AR',
    })
})

app.listen(port, () => {
    console.log('Server Port ' + port)
})