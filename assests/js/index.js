//making the api request
const cityInputEl = document.getElementById("city-input");
//console.log(apiKey)

function getApi() {
  getCurrentDay();
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputEl.value}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var htmlCard = "";
      for (var i = 0; i < data.list.length; i = i + 8) {
        htmlCard += `
            <div class="card bg-primary text-white p-2 m-2" style="width: 10rem;">
            <h5 class="card-title">${data.list[i].weather[0].description}<span>
  <img src="https://openweathermap.org/img/wn/${
    data.list[i].weather[0].icon
  }@2x.png"." class="card-img-top" height="70" width="10" alt="..."></span></h5>
  <div class="card-body">
    <h5 class="card-title">${cityInputEl.value}</h5>
    <p class="card-text">Temprature ${data.list[i].main.temp}</p>
    <p class="card-text">Humidity ${data.list[i].main.humidity}</p>
    <p class="card-text">Wind Speed ${data.list[i].wind.speed}</p>
    <p class="card-text">${dayjs(data.list[i].dt_txt).format("MM/DD/YYYY")}</p>
  </div>
</div>
            `;
      }
      document.getElementById("forecastFiveDays").innerHTML = htmlCard;
    });
}
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function getCurrentDay() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var htmlCard = "";

      htmlCard += `
            <div class="card" style="width: 75%;">
            <h5 class="card-title">${data.weather[0].description}<span>
  <img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png"." class="card-img-top" height="40" width="5" alt="..."></span></h5>
  <div class="card-body">
    <h5 class="card-title">${cityInputEl.value}</h5>
    <p class="card-text">Temprature ${data.main.temp}</p>
    <p class="card-text">Humidity ${data.main.humidity}</p>
    <p class="card-text">Wind Speed ${data.wind.speed}</p>
    <p class="card-text">${dayjs(data.dt_txt).format("MM/DD/YYYY")}</p>
  </div>
</div>
            `;

      document.getElementById("currentWeather").innerHTML = htmlCard;
    });
}

document.getElementById("search-button").addEventListener("click", getApi);
