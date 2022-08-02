// creating doc element variables
var searchButton = document.querySelector("#searchButton");
var fiveDayForecast = document.querySelector("#weather-container");
var currentWeather = document.querySelector("#weather-forecast");
var searchHistroy = document.querySelector(".history");
var input = document.querySelector("#city");
var weatherEl = document.createElement("p");
var oldButtons = document.querySelector(".buttons");
var forcastEl1 = document.createElement("p");
var forcastEl2 = document.createElement("p");
var forcastEl3 = document.createElement("p");
var forcastEl4 = document.createElement("p");
var forcastEl5 = document.createElement("p");

// creating global variables used in functions
var searches = [];
var index = 0;
tracker = 1;

// function to handle the submit event
function handleSubmit(event){
    event.preventDefault();
    var search = input.value.trim();
    searches.push(search);
    localStorage.setItem(index, search);
    index ++;
    displayHistory();
    input.value = "";
    getWeather(search);
    getForecast(search);
}

// function that displays the search history buttons
function displayHistory(){
        var searchEl = document.createElement("button");
        searchEl.classList.add("buttons");
        searchEl.setAttribute('id', "buttons" + tracker);
        tracker++;

        searchEl.innerHTML = localStorage.getItem(index-1);
        searchHistroy.appendChild(searchEl);
        searchEl.style.listStyle = "none";

}


//  displays weather info
function displayWeather(data){

    console.log(data);
    weatherEl.innerHTML = "temp: " + JSON.stringify(data.main.temp) + "°F<br> wind: " + JSON.stringify(data.wind.speed) + "mph<br>Humidity: " + JSON.stringify(data.main.humidity);
    currentWeather.appendChild(weatherEl);

}

// displays the forecast info
function displayForecast(data){

    console.log(data);


    forcastEl1.innerHTML = "Day 1<br> temp: " + JSON.stringify(data.list[0].main.temp) + "°F<br> wind: " + JSON.stringify(data.list[0].wind.speed) + "mph<br>Humidity: " + JSON.stringify(data.list[0].main.humidity);
    forcastEl2.innerHTML = "Day 2<br> temp: " + JSON.stringify(data.list[1].main.temp) + "°F<br> wind: " + JSON.stringify(data.list[1].wind.speed) + "mph<br>Humidity: " + JSON.stringify(data.list[1].main.humidity);
    forcastEl3.innerHTML = "Day 3<br> temp: " + JSON.stringify(data.list[2].main.temp) + "°F<br> wind: " + JSON.stringify(data.list[2].wind.speed) + "mph<br>Humidity: " + JSON.stringify(data.list[2].main.humidity);
    forcastEl4.innerHTML = "Day 4<br> temp: " + JSON.stringify(data.list[3].main.temp) + "°F<br> wind: " + JSON.stringify(data.list[3].wind.speed) + "mph<br>Humidity: " + JSON.stringify(data.list[3].main.humidity);
    forcastEl5.innerHTML = "Day 5<br> temp: " + JSON.stringify(data.list[4].main.temp) + "°F<br> wind: " + JSON.stringify(data.list[4].wind.speed) + "mph<br>Humidity: " + JSON.stringify(data.list[4].main.humidity);

    fiveDayForecast.appendChild(forcastEl1);
    fiveDayForecast.appendChild(forcastEl2);
    fiveDayForecast.appendChild(forcastEl3);
    fiveDayForecast.appendChild(forcastEl4);
    fiveDayForecast.appendChild(forcastEl5);


}

// api call for weather info

function getWeather(name){
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&appid=798857f5f7d6213943574838124df4c6"
    fetch(apiURL).then(function (response){
        if (response.ok){
            response.json().then(function(data){
                displayWeather(data);
            });
        }
    });
};

// api call for forecast info

function getForecast(name){
    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=imperial&appid=798857f5f7d6213943574838124df4c6"
    fetch(apiURL).then(function (response){
        if (response.ok){
            response.json().then(function(data){
                displayForecast(data);
            });
        }
    });
};

// handles search history button clicks
function handleOldButtons(event){
    event.preventDefault();
    var search = event.target.innerHTML;
    getWeather(search);
    getForecast(search);
}

// event listeners for the button clicks
searchButton.addEventListener('click', handleSubmit);
searchHistroy.addEventListener('click', handleOldButtons);