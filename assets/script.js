var apiKey = "86c2386f7cd01320261c251552adbfb4";
var currentURL =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey;
var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey;
var fiveDayURL =
  "https://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey;

var cities = JSON.parse(localStorage.getItem("cities")) || [];

var searchBTN = document.getElementById("searchIcon");
var todayContainer = document.getElementById("today");

searchBTN.addEventListener("click", function (event) {
  var userInput = document.getElementById("searchText").value;
  cities.push(userInput);
  localStorage.setItem("cities", JSON.stringify(cities));
  fetch(currentURL + `&q=${userInput}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCurrentWeather(data);
      displayFiveDayForecast(userInput);
    });
});
function displayCurrentWeather(data) {
  todayContainer.innerHTML = "";
  var title = document.createElement("h2");
  var date = document.createElement("h2");

  title.innerText = data.name;
  date.innerText = new Date(data.dt * 1000);

  todayContainer.appendChild(title);
  todayContainer.appendChild(date);

  getUVIndex(data.coord.lon, data.coord.lat);
}
function getUVIndex(lon, lat) {
  fetch(uvIndex + "&lat=" + lat + "&lon=" + lon)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const UV = data.value;
      var uvEl = document.createElement("p");

      if (UV >= 10) {
        uvEl.classList.add("red");
      } else if (UV >= 7 && UV < 10) {
        uvEl.classList.add("pink");
      } else {
        uvEl.classList.add("yellow");
      }

      uvEl.innerText = "UV index : " + UV;
      todayContainer.appendChild(uvEl);
    });
}
function displayFiveDayForecast(city) {}
