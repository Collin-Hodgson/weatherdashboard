var apiKey = "86c2386f7cd01320261c251552adbfb4";
var currentURL = "https://api.openweathermap.org/data/2.5/weather?";
var searchBTN = document.getElementById("searchIcon");

searchBTN.addEventListener('click',function(event){
  // console.log("I was clicked")
  var userInput = document.getElementById("searchText").value;
  // fetch(currentURL+"q="+userInput+"&appid="+apiKey)
  fetch(currentURL+`q=${userInput}&appid=${apiKey}`)
  .then(function(response){
    return response.json()
  }).then(function(data){
    // console.log(data.weather[0].description);
   var todayContainer = document.getElementById("today");
  var h1El = document.createElement('h1');
  // 
  h1El.value=data.name;
  todayContainer.appendChild(h1El);

  })
});