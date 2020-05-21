var rp = require('request-promise');

// const getWeatherDetails = ({latitude, longitude}, callback)=>{
const getWeatherDetails = (address, callback)=>{
    console.log('In getWeatherDetails: ', address);
    const url = 'http://api.weatherstack.com/current';
    var options = {
        uri: url,
        qs:{
            access_key:'57965ba540f97e64be06857042a1cb61',
            //query:latitude+','+longitude,
            query:address,
            units:'m'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    console.log('In getWeatherDetails options: ', options);
    rp(options)
        .then(function (res) {
            // Process html...
            var location = res.location;
            var current = res.current;
            console.log(">>>>>>>>>>>>>>>",res);
            if(!location || !current){
                err = {
                    message: res.info || 'No data returned'
                }
                callback(err, {
                        locationName: undefined,
                        description: undefined,
                        currentTemperature: undefined,
                        currentFeelsLike: undefined,
                        currentPrecip: undefined
                    });
                
            }else{
                callback(undefined, {
                    locationName: location.name,
                    description: current.weather_descriptions[0],
                    currentTemperature: current.temperature,
                    currentFeelsLike: current.feelslike,
                    currentPrecip: current.precip
                })
            }
             
        })
        .catch(function (err) {
            // Crawling failed...
            callback(err, {
                locationName: undefined,
                description: undefined,
                currentTemperature: undefined,
                currentFeelsLike: undefined,
                currentPrecip: undefined
            });
        });

}

module.exports = getWeatherDetails;