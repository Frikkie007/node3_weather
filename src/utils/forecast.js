const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/6ef8b25230b36f1cc5f848f82b997744/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currently = body.currently
            callback(undefined, body.daily.data[0].summary + `\n•It is currently ${currently.temperature} degrees celsuis out.\n•There is a ${currently.precipProbability * 100}% chance of rain.`)
        }
    })
}

module.exports = forecast