//making the api request
const cityInputEl = document.getElementById("city-input");
const containerEl = document.querySelector(".container");
const subcontainerEl = document.querySelector(".subcontainer");
const containerButtons = document.querySelector(".container_buttons");
const apiKey = "473b00c4ed0b74d622b98d1645a9c63d";
//console.log(apiKey)

let cityList = JSON.parse(localStorage.getItem("cityList")) || [];

function getApi(cityName) {
  getCurrentDay(cityName);
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var htmlCard = " ";
      for (var i = 0; i < data.list.length; i = i + 8) {
        htmlCard += `
            <div class="card bg-primary text-white p-1 m-1 fiveday" style="width: 11rem;">
            <p class="card-text">${dayjs(data.list[i].dt_txt).format(
              "MM/DD/YYYY"
            )}</p>
            
            <span>
  <img src="https://openweathermap.org/img/wn/${
    data.list[i].weather[0].icon
  }@2x.png"." class="card-img-top" alt="..."></span>
  
    
    <p class="card-text">Temprature ${data.list[i].main.temp}</p>
    <p class="card-text">Humidity ${data.list[i].main.humidity}</p>
    <p class="card-text">Wind Speed ${data.list[i].wind.speed}</p>
    

</div>
            `;
      }

      document.querySelector("#fiveDay").style.display = "block";
      document.getElementById("forecastFiveDays").innerHTML = htmlCard;
      // const h5El = document.createElement("h5");
      // h5El.innerText = "5-Day Forecast: ";

      // const target = document.getElementById("forecastFiveDays");
      // target.parentNode.insertBefore(h5El, target);
    });

  saveCity(cityName);
  displayCity();
}
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function getCurrentDay(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var htmlCard = "";

      htmlCard += `
            <div class="card" style="width: 100%;">
            <h4 class="card-title">${cityName} <span>(${dayjs(
        data.dt_txt
      ).format("MM/DD/YYYY")})</span>
      
            <span>
            <img src="https://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@2x.png"." class="card-img-top" alt="..."></span>  
      
      
      </h4>
            <h5 class="card-title">${data.weather[0].description}</h5>
            
            

    <p class="card-text">Temprature ${data.main.temp}</p>
    <p class="card-text">Humidity ${data.main.humidity}</p>
    <p class="card-text">Wind Speed ${data.wind.speed}</p>
    

</div>
            `;

      document.getElementById("currentWeather").innerHTML = htmlCard;
    });
}

//adding city input to local storage

function saveCity(cityName) {
  if (!cityList.includes(cityName)) {
    cityList.push(cityName);
    localStorage.setItem("cityList", JSON.stringify(cityList));
  }
  cityInputEl.value = ``;
}

//displaying the city from local storage
function displayCity() {
  containerButtons.innerHTML = "";

  for (let i = 0; i < cityList.length; i++) {
    var city = cityList[i];
    console.log(city);
    var cityEl = document.createElement("button");
    cityEl.textContent = city;
    cityEl.classList.add("btn", "btn-primary", "btn-block", "mt-2", "mb-5");
    cityEl.setAttribute("class", "d-block w-100");
    cityEl.setAttribute("id", "city-button");
    containerButtons.append(cityEl);
    cityEl.addEventListener("click", function (event) {
      let seachedCity = event.target.textContent;
      getApi(seachedCity);
    });
  }
}

displayCity();
document.getElementById("search-button").addEventListener("click", function () {
  getApi(cityInputEl.value);
});
