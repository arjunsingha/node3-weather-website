var rp = require('request-promise');

const getGeoCode = (locationName, callback)=>{
    const coordinateurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(locationName)+'.json';
    var coordinate_options = {
        uri: coordinateurl,
        qs:{
            access_token:'pk.eyJ1IjoiYXJqdW5zaW5naGEiLCJhIjoiY2s4dThldDE5MDQ2cTNucGxjdzUwMHFobyJ9.pheEQjt5dI-MfvWYCoYdGw',
            limit:1
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    rp(coordinate_options).then(function ({features}) {
            // Process html...
            callback(undefined ,{
                latitude: features[0].center[1],
                longitude: features[0].center[0]
            });
            
        })
        .catch(function (err) {
            // Crawling failed...
            callback(err, undefined)
        }
    );

}

module.exports = getGeoCode;