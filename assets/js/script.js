//references to html elements
var inputtedCityEl = $("#input-lookup-city");
var cityFormEl = $("#input-form");
var cityNameEl = $("#input-lookup-city");
var buttonDivEl = $("#button-div");
var weatherDivEl = $("#weather-field");
var removeButtonEl = $('#remove-button');

//holds the current city whos weather should be displayed
var apiKey = "1373a1914a26d8a7e9e30e10d307cd06";
var today = moment();
//loads this from local storage and fills so we have info on past searches
var pastSearches = [];

/*
 * On submit of the form this function will get the value of the city
 * that the user is searching for and call functions to make a button and to 
 * populate the weather. Only adds if it wasn't already added, also puts it in
 * local storage.
 */
var citySubmit = function (event) {
    event.preventDefault();
    var currCity = cityNameEl.val();
    cityNameEl.val("");
    if(!pastSearches.includes(currCity)) {
      pastSearches[pastSearches.length] = currCity;
      localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
      addButton(currCity);
    }
    populateWeather(currCity.replace(" ", "+"));
}

/*
 * This function gets called if we click on one of the buttons for the past searches. It functions
 * the same as a submit button push but instead we don't have to add the button since it is already there
 * so it will just populate the weather fields.
 */
var previousCity = function (event) {
    var currCity = $(event.currentTarget).text();
    populateWeather(currCity.replace(" ", "+"));
};

/*
 * Adds a button for the city that was passed in
 */
function addButton(city) {
    var btn = $("<btn>");
    btn.addClass("btn btn-white mx-2 w-100 border border-dark");
    btn.text(city);
    buttonDivEl.append(btn);
}

/*
 * This will populate the current weather with the data gotten from an api request, will build the html elements then append them to the
 * page. Will then call the function to build the future weather conditions
 */
function populateWeather(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    weatherDivEl.html("");

    //fetch the cities current weather
    fetch(requestUrl)
    .then(function (response) {
      //check if we get 404 back from the api request and tell user
      if (response.status === 404) {
        var header = $('<h2>');
        header.text("City was not found");
        weatherDivEl.append(header);
        return "";
      }
      return response.json();
    })
    .then(function (data) {
      //don't try to access data that doesn't exist
      if(data == "") {
        return;
      }
      //build the html element that will store the values for the current weather, get the data values from the api return
      //give classes to style through bootstrap
      var currWeatherCard = $('<section>');
      currWeatherCard.addClass("card p-3 col-12");
      var hAndIcon = $('<div>');
      hAndIcon.addClass("d-flex");
      var header = $('<h2>');
      header.text(city.replace("+", " ") + " (" + today.format("MM/DD/YYYY") + ")");
      var img = $('<img>');
      img.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
      var tempEl = $('<p>');
      tempEl.text("Temperature: " + data.main.temp + " °F");
      var humidEl = $('<p>');
      humidEl.text("Humidity: " + data.main.humidity + "%");
      var windSpeedEl = $('<p>');
      windSpeedEl.text("Wind Speed: " + data.wind.speed + " MPH")
      requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial";
      //we don't have access to the weather later on or the uvi so we need to do a different fetch request using the lattitude and longitude we got from
      //this past request
      fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //create uv for the current weather
        var uvEl = $('<p>');
        //put uvi value in a span so we can color it seperately
        var uvTextEl = $('<span>');
        uvEl.text("UV Index: ");
        uvTextEl.text(data.current.uvi);
        //color the uvi based on the value, green if favorable, yellow if moderate, red if severe
        if(data.current.uvi >= 0 && data.current.uvi < 3) {
          uvTextEl.addClass("bg-success px-3 py-1");
        }
        else if(data.current.uvi >= 3 && data.current.uvi < 6) {
          uvTextEl.addClass("bg-warning px-3 py-1");
        }
        else {
          uvTextEl.addClass("bg-danger px-3 py-1");
        }
        //append everything and then append to page
        uvEl.append(uvTextEl);
        hAndIcon.append(header);
        hAndIcon.append(img);
        currWeatherCard.append(hAndIcon);
        currWeatherCard.append(tempEl);
        currWeatherCard.append(humidEl);
        currWeatherCard.append(windSpeedEl);
        currWeatherCard.append(uvEl);
        weatherDivEl.append(currWeatherCard);
        //call function to go build the rest of the page
        buildFiveDayForecast(data);
      });
    });
}

function buildFiveDayForecast(data) {
  //initialize variables to hold the date that we will be populating
  var year = today.year();
  var dayOfYear = today.dayOfYear();
  var writtenDay;

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
    var header = $('<h4>');
    header.addClass("text-break")
    header.text("(" + writtenDay.format("MM/DD/YYYY") + ")");
    var img = $('<img>');
    img.attr("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
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

/*
 * This will add buttons for previous searches that were stored in local storage
 */
function loadButtons() {
  pastSearches = JSON.parse(localStorage.getItem('pastSearches'));
  if(pastSearches == null) {
    pastSearches = [];
  }
  for(var i = 0; i < pastSearches.length; i++) {
    addButton(pastSearches[i]);
  }
}

//Calls functions if buttons are clicked
cityFormEl.on("submit", citySubmit);
buttonDivEl.on("click", ".btn", previousCity);

/*
 * Listens for remove button click, if clicked will clear local storage and get rid of buttons
 * on the page.
 */
removeButtonEl.on("click", function() {
  pastSearches = [];
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  buttonDivEl.html("");
});

//Initially loads buttons from local storage and adds to page
loadButtons();