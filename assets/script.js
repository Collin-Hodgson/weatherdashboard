var apiKey = "86c2386f7cd01320261c251552adbfb4";
var currentURL =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  apiKey +
  "&units=imperial";
var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey;
var fiveDayURL =
  "https://api.openweathermap.org/data/2.5/forecast?appid=" +
  apiKey +
  "&units=imperial";
let getDate = function (days) {
  let someDate = new Date();
  let numberOfDaysToAdd = days;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  let dd = someDate.getDate();
  let mm = someDate.getMonth() + 1;
  let y = someDate.getFullYear();

  return mm + " / " + dd + " / " + y;
};

var austin = document.getElementById("austin");
var chicago = document.getElementById("chicago");
var newYork = document.getElementById("newYork");
var orlando = document.getElementById("orlando");
var sanFran = document.getElementById("sanFran");
var seattle = document.getElementById("seattle");
var denver = document.getElementById("denver");
var atlanta = document.getElementById("atlanta");

var cities = JSON.parse(localStorage.getItem("cities")) || [];

var searchBTN = document.getElementById("searchIcon");
var todayContainer = document.getElementById("today");
function displayCurrentWeather(data) {
  $("#today").html("");
  console.log(data);
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  fetch(uvIndex + `&lat=${lat}&lon=${lon}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayUV(data);
    });
  $("#today").append(
    "<h2>" +
      data.name +
      getDate(0) +
      `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">` +
      "</h2>" +
      "<p>Temperature: " +
      data.main.temp +
      " F </p>" +
      "<p>Humidity: " +
      data.main.humidity +
      " % </p>" +
      "<p>Wind Speed: " +
      data.wind.speed +
      " MPH </p>"
  );
}

function displayUV(data) {
  console.log(data);

  if (data.value < 3) {
    $("#today").append(
      "<p>UV: <span class='lowUV'>" + data.value + "</span></p>"
    );
  } else if (data.value < 8) {
    $("#today").append(
      "<p>UV: <span class='midUV'>" + data.value + "</span></p>"
    );
  } else {
    $("#today").append(
      "<p>UV: <span class='highUV'>" + data.value + "</span></p>"
    );
  }
}

function displayFiveDay(data) {
  $("#fiveDays").html("");
  console.log(data);
  for (let i = 0; i < 5; i++) {
    $("#fiveDays").append(
      "<div class='days bg-primary'>" +
        "<h3>" +
        getDate(i) +
        "</h3>" +
        `<img src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">` +
        "<p>Temperature: " +
        data.list[i].main.temp +
        " F </p>" +
        "<p>Humidity: " +
        data.list[i].main.humidity +
        " % </p>" +
        "</div>"
    );
  }
}
searchBTN.addEventListener("click", function weather(event) {
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

  fetch(fiveDayURL + `&q=${userInput}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayFiveDay(data);
    });
});
