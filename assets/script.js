const apiKey = "86c2386f7cd01320261c251552adbfb4";

let mph = (speed) => {
  return parseFloat(speed * (3600 / 1609.344)).toFixed(2);
};

let searchedCities = [];
if (localStorage.getItem("citySearch")) {
  searchedCities = JSON.parse(localStorage.getItem("citySearch"));
}

let getDate = function (days) {
    let someDate = new Date();
    let numberOfDaysToAdd = days;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  
    let dd = someDate.getDate();
    let mm = someDate.getMonth() + 1;
    let y = someDate.getFullYear();
  
    return mm + " / " + dd + " / " + y;
  };

  $(document).ready(function () {
    var currentConditions = function (cityName, searched) {
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
        success: function (result) {
          if (searched === true) {
            if (searchedCities.includes($("#search input").val()) !== true) {
              searchedCities.push($("#search input").val());
              localStorage.setItem("citySearch", JSON.stringify(searchedCities));
            }
            localStorage.setItem("lastCitySearch", $("#search input").val());
          }
  
          cityId = result.id;
          $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey}&units=imperial`,
            success: function (result) {
              $("#today").html("");
              $("#today").append(
                `<div class="blockHeading"><h2>${result.city.name} ( ${getDate(
                  0
                )} )</h2><img src="https://openweathermap.org/img/w/${
                  result.list[0].weather[0].icon
                }.png" alt="${
                  result.list[0].weather[0].description
                }" width='50' height='50'>`
              );
              $("#today").append(
                `<p class="temperature">Temperature: ${result.list[0].main.temp} °F</p>`
              );
              $("#today").append(
                `<p class="humidity"> Humidity: ${result.list[0].main.humidity} %</p>`
              );
              $("#today").append(
                `<p class="wind_speed">Wind Speed:  ${mph(
                  result.list[0].wind.speed
                )} MPH</p>`
              );  