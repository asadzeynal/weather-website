const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/1a5f07fbabea5b3fb2f53320c6bf471d/' + lat + ',' + long + '?units=si&lang=en';
    request({url, json:true}, (err, { body }) => {
        if(err){
            callback('Could not connect to weather service!', undefined);
        } else if (body.error){
            callback('Location not found, try another search', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}
            % chance of rain. The wind is blowing at ${body.currently.windSpeed} meters per second.`);
        }
    })
}

module.exports = forecast;