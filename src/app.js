const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeoCode = require('./utils/geocode');
const getWeatherDetails = require('./utils/getWeatherDetails');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

const port = 3000;

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Arjun'
    });
});
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Arjun'
    });
});
app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Arjun',
        message:'this is the help message for the page'
    });
});


app.get('/weather',(req, res)=>{
    console.log("In get weather api");
    if(!req.query.address){
        res.send({
            error: 'You must provide an address'
        });
        return
    }
    var address = req.query.address;
    // getGeoCode(address, (error, data)=>{
    //         if(data){
    //             console.log(JSON.stringify(data));
    //             getWeatherDetails(address,(error, {locationName, description, currentTemperature, currentFeelsLike, currentPrecip})=>{
    //                 if(error){
    //                     res.send({
    //                         error: 'ERROR: CANNOT FETCH DATA FROM WEATHER SERVICE'
    //                     });
    //                     // console.log('ERROR: CANNOT FETCH DATA FROM WEATHER SERVICE');
    //                 }else{
    //                     console.log('The current weather condition for '+locationName);
    //                     console.log(description);
    //                     console.log('Temparature '+currentTemperature +'deg but feels like '+currentFeelsLike+"\n with "+currentPrecip+'% chance of precipitation');
    //                     res.send({
    //                         description: description,
    //                         forecast: 'Temparature '+currentTemperature +'deg but feels like '+currentFeelsLike+" with "+currentPrecip+'% chance of precipitation',
    //                         location: locationName,
    //                         address: req.query.address
    //                     })
    //                 }
    //             });
    //         }else if(error){
    //             // console.log("ERROR: UNABLE TO FETCH LOCATION DATA");
    //             res.send({
    //                 error: 'ERROR: UNABLE TO FETCH LOCATION DATA'
    //             });
    //         }
    // });

    getWeatherDetails(address,(error, {locationName, description, currentTemperature, currentFeelsLike, currentPrecip})=>{
        if(error){
            res.send({
                error: error//'ERROR: CANNOT FETCH DATA FROM WEATHER SERVICE'
            });
            // console.log('ERROR: CANNOT FETCH DATA FROM WEATHER SERVICE');
        }else{
            res.send({
                description: description,
                forecast: 'Temparature '+currentTemperature +'deg but feels like '+currentFeelsLike+" with "+currentPrecip+'% chance of precipitation',
                location: locationName,
                address: req.query.address
            })
        }
    });
    
});

app.get('/products',(req, res)=>{
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        });
        return
    }
        console.log("request:",req.query);
        res.send({
            products:[],
            query: req.query
        })
    
    
});

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: 'Help',
        name: 'Arjun',
        message:'help article not found'
    });
});

app.get('*',(req, res)=>{
    res.render('error',{
        title: '404',
        name: 'Arjun',
        message:'Page Not Found'
    });
});

app.listen(port, () => console.log(`Server is up http://localhost:${port}`))