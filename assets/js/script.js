var inputtedCityEl = $("#input-lookup-city");
var cityFormEl = $("#input-form");
var cityNameEl = $("#input-lookup-city");
var buttonDivEl = $("#button-div");

var currCity;

var citySubmit = function (event) {
    event.preventDefault();
    currCity = cityNameEl.val();
    cityNameEl.val("");
    addButton(currCity);
}

function addButton(city) {
    var btn = $("<btn>");
    btn.addClass("btn btn-primary m-2 w-100");
    btn.text(city);
    buttonDivEl.append(btn);
}

cityFormEl.on("submit", citySubmit);