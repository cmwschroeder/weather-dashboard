# Weather Dashboard

## Description

This webpage can be used to lookup weather for cities! Just type in a city name in the search bar and you will be informed about the current weather and given a mini weather update about the 5 days after today. If you mistype your city don't worry, the webpage will inform you that your city was not found. This webpage uses OpenWeather through an API request in order to get weather information for the looked up city. Cities that are searched will be saved locally and provided with a button on the page in order to quickly look them up again. If you do type in the same city again instead of using the button to reload past results, it will not add another button for that city. If you want to get rid of the past searches then just click the remove past searches button and they will be removed from your local storage and will not show up again unless searched.   
This webpage uses 2 api calls to get the weather and uses JQuery in order to create html elements and then append them to the page dynamically. Searches that brought 404 response back from OpenWeather will be put onto the past searches bar and will return 404 again if that button is clicked. You can remove this button by removing all buttons. The UV Index provides color information based on how high it is. 0 to 2 will be green for good conditions, 3-5 will be yellow for moderate conditions, 6 and on will be red for severe UV conditions. There will also be icons next to the dates that will give information on current and future weathers. These were also gotten from OpenWeather.

## Table of Contents

* [Technologies](#technologies)
* [Link](#link)
* [Usage](#usage)

## Technologies

| Technology | Link |
| -------- | ------|
| HTML |    |
| CSS |    |
| Javascript|    |
| Jquery | https://jquery.com/ |
| Bootstrap | https://getbootstrap.com/ |
| Moment | https://momentjs.com/ |
| OpenWeather API | https://openweathermap.org/ |

## Link

https://cmwschroeder.github.io/weather-dashboard/

## Usage

On first load the webpage will be empty with nothing populated
![Page on load](https://github.com/cmwschroeder/weather-dashboard/blob/main/assets/images/screenshot-one.png)  

You can type in a city and press the submit button to get the current and future weather data for that city as well as add a button for easier lookup in the future.
![Weather populated on page of Seattle](https://github.com/cmwschroeder/weather-dashboard/blob/main/assets/images/screenshot-two.png)  

Successive searches will add more buttons to keep track of the past searches
![Page with lots of past searches](https://github.com/cmwschroeder/weather-dashboard/blob/main/assets/images/screenshot-three.png)  

On page reload, or just visiting the webpage later the buttons will remain
![Empty weather field but still lots of buttons](https://github.com/cmwschroeder/weather-dashboard/blob/main/assets/images/screenshot-four.png)  

You may click any button and it will perform the same search
![Weather field full with atlanta data, a past search](https://github.com/cmwschroeder/weather-dashboard/blob/main/assets/images/screenshot-five.png)  

On looking up something that openweather doesn't return results for, you will be informed
![Page saying city not found](https://github.com/cmwschroeder/weather-dashboard/blob/main/assets/images/screenshot-six.png)  

You may click the remove past searches at any time to get rid of all the buttons and remove past searches from local storage
![Page with all buttons removed](https://github.com/cmwschroeder/weather-dashboard/blob/main/assets/images/screenshot-seven.png)  

Here it is all in use:

![Gif of wepage working](./assets/gif/weather-dashboard.gif)