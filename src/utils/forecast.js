const request = require('postman-request') 




const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=6ea0d7a78c3a6bfb2a65c7ba52d04c79&query=' + latitude + ',-' + longitude + '&units=m'

    request({ url, json:true}, (error, {body}) => {
        
        if (error) {
            callback('Unable to connect to weather services!', undefined)

        } else if ( body.error) {
            callback('Unable to find location!', undefined)

        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees ', 'It is ' + body.current.weather_descriptions)

        }

    })

}

module.exports = forecast