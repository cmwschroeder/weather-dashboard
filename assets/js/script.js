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
    btn.addClass("btn btn-white mx-2 w-100 border border-dark");
    btn.text(city);
    buttonDivEl.append(btn);
}

function populateWeather(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    weatherDivEl.html("");

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currWeatherCard = $('<section>');
      currWeatherCard.addClass("card p-3 col-12");
      var hAndIcon = $('<div>');
      hAndIcon.addClass("d-flex");
      var header = $('<h2>');
      header.text(city.replace("+", " ") + " (" + today.format("MM/DD/YYYY") + ")");
      var img = $('<img>');
      img.attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
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
        var uvEl = $('<p>');
        uvEl.text("UV Index: " + data.current.uvi);
        hAndIcon.append(header);
        hAndIcon.append(img);
        currWeatherCard.append(hAndIcon);
        currWeatherCard.append(tempEl);
        currWeatherCard.append(humidEl);
        currWeatherCard.append(windSpeedEl);
        currWeatherCard.append(uvEl);
        weatherDivEl.append(currWeatherCard);
        buildFiveDayForecast(data);
      });
    });
}

function buildFiveDayForecast(data) {
  //initialize variables to hold the date that we will be populating
  var year = today.year();
  var dayOfYear = today.dayOfYear();
  var writtenDay;

  console.log(data);

  var header = $("<h3>");
  header.addClass("col-12");
  header.text("5-Day Forecast: ");
  weatherDivEl.append(header);

  //for loop to iterate through and add each successive days weather
  for(var i = 1; i < 6; i++) {

    //make the day of the year plus one
    dayOfYear++;
    //check to see if we need to increment the year, also holds logic for leap years
    if(dayOfYear > 365 && (year % 4) != 0) {
      dayOfYear = 1;
      year++;
    } else if (dayOfYear > 366 && (year % 4) === 0){
      dayOfYear = 1;
      year++;
    }

    //use moment to get the next day
    writtenDay = moment().dayOfYear(dayOfYear);

    //start creating the div to hold this days weather
    var currDayDiv = $('<div>');
    currDayDiv.addClass("col-2 bg-primary m-2 rounded text-light");
    var header = $('<h3>');
    header.text("(" + writtenDay.format("MM/DD/YYYY") + ")");
    var img = $('<img>');
    img.attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
    var tempEl = $('<p>');
    tempEl.text("Temperature: " + data.daily[i].temp.day + " °F");
    var humidEl = $('<p>');
    humidEl.text("Humidity: " + data.daily[i].humidity + "%");

    currDayDiv.append(header);
    currDayDiv.append(img);
    currDayDiv.append(tempEl);
    currDayDiv.append(humidEl);
    weatherDivEl.append(currDayDiv);
  }
}

cityFormEl.on("submit", citySubmit);
buttonDivEl.on("click", ".btn", previousCity);