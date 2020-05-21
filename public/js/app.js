console.log('Client side js!!');

const urlBasePath ='http://localhost:3000/weather?address=';

const getWeatherDetails = ()=>{
    var location = document.querySelector('#txtCity').value;
    fetch(urlBasePath+location)
    .then(
        (response)=> {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        // Examine the text in the response
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error.message || data.error);
                document.querySelector('.description').innerHTML = '';
                document.querySelector('.forecast').innerHTML = '';
                document.querySelector('.location').innerHTML = '';
                document.querySelector('.error').innerHTML = data.error.message || data.error;
            }else{
                console.log(data);
                console.log(data.description);
                document.querySelector('.error').innerHTML = '';
                document.querySelector('.description').innerHTML = data.description;
                console.log(data.forecast);
                document.querySelector('.forecast').innerHTML = data.forecast;
                console.log(data.location);
                document.querySelector('.location').innerHTML = data.location;
            }
            
        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

