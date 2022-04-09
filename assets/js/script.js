//references to html elements
var inputtedCityEl = $("#input-lookup-city");
var cityFormEl = $("#input-form");
var cityNameEl = $("#input-lookup-city");
var buttonDivEl = $("#button-div");
var weatherDivEl = $("#weather-field");

//holds the current city whos weather should be displayed
var apiKey = "1373a1914a26d8a7e9e30e10d307cd06";
var today = moment();

/*
 * On submit of the form this function will get the value of the city
 * that the user is searching for and call functions to make a button and to 
 * populate the weather
 */
var citySubmit = function (event) {
    event.preventDefault();
    var currCity = cityNameEl.val();
    cityNameEl.val("");
    addButton(currCity);
    populateWeather(currCity.replace(" ", "+"));
}

var previousCity = function (event) {
    var currCity = $(event.currentTarget).text();
    populateWeather(currCity.replace(" ", "+"));
};

function addButton(city) {
    var btn = $("<btn>");
    btn.addClass("btn btn-primary m-2 w-100");
    btn.text(city);
    buttonDivEl.append(btn);
}

function populateWeather(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var header = $('<h2>');
      header.text(city.replace("+", " ") + " (" + today.format("MM/DD/YYYY") + ")");
      var tempEl = $('<p>');
      tempEl.text("Temperature: " + data.main.temp + " °F");
      var humidEl = $('<p>');
      humidEl.text("Humidity: " + data.main.humidity + "%");
      var windSpeedEl = $('<p>');
      windSpeedEl.text("Wind Speed: " + data.wind.speed + " MPH")
      requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial";
      fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var uvEl = $('<p>');
        uvEl.text("UV Index: " + data.current.uvi);
        weatherDivEl.append(header);
        weatherDivEl.append(tempEl);
        weatherDivEl.append(humidEl);
        weatherDivEl.append(windSpeedEl);
        weatherDivEl.append(uvEl);
      });
    });
}

cityFormEl.on("submit", citySubmit);
buttonDivEl.on("click", ".btn", previousCity);