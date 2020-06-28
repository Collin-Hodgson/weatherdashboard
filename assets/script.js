const apiKey = "86c2386f7cd01320261c251552adbfb4";

let mph = (speed) => {
  return parseFloat(speed * (3600 / 1609.344)).toFixed(2);
};

let searchedCities = [];
if (localStorage.getItem("citySearch")) {
  searchedCities = JSON.parse(localStorage.getItem("citySearch"));
}
