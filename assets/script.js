var apiKey = "86c2386f7cd01320261c251552adbfb4";
var currentURL =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey;
var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey;
var fiveDayURL =
  "https://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey;

var cities = JSON.parse(localStorage.getItem("cities")) || [];

var searchBTN = document.getElementById("searchIcon");
var todayContainer = document.getElementById("today");
function displayCurrentWeather(data) {
  $("#today").append(
    "<h2>" +
      data["name"] +
      "</h2>" +
      "<p>Temperature: " +
      data["main"]["temp"] / 10 +
      " F</p>" +
      "<p>Humidity: " +
      data["main"]["humidity"] +
      "</p>" +
      "<p>Wind Speed: " +
      data["wind"]["speed"] +
      "MPH </p>"
  );
}

function displayUV(data) {
  $("#today").append("<p>UV: " + test + "</p>");
}
searchBTN.addEventListener("click", function (_event) {
  var userInput = document.getElementById("searchText").value;
  //cities.push(userInput);
  //localStorage.setItem("cities", JSON.stringify(cities));
  fetch(currentURL + `&q=${userInput}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCurrentWeather(data);
      //displayFiveDayForecast(userInput);
    });
  fetch(uvIndex)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayUV(data);
    });
});
