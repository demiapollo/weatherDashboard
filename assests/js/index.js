

//making the api request
const apiKey = "473b00c4ed0b74d622b98d1645a9c63d"
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