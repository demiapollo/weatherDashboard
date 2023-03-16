

//making the api request
const cityInputEl = document.getElementById("city-input");

function getApi () {
    const url = "api.openweathermap.org/data/2.5/forecast?q=cityInputEl&limit=1&appid=apiKey"
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)

    });
}

getApi();