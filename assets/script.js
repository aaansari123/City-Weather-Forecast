// key 798857f5f7d6213943574838124df4c6
var searchButton = document.querySelector("#searchButton");
var fiveDayForecast = document.querySelector("#weather-container");
var currentWeather = document.querySelector("#weather-forecast");
var searchHistroy = document.querySelector(".history");
var input = document.querySelector("#city");
var weatherEl = document.createElement("a");
var oldButtons = document.querySelector(".buttons");

var searches = [];
var index = 0;
tracker = 1;
function handleSubmit(event){
    event.preventDefault();
    var search = input.value.trim();
    searches.push(search);
    console.log(searches);
    localStorage.setItem(index, search);
    index ++;
    displayHistory();
    console.log(index);
    input.value = "";
    getWeather(search);
}

function displayHistory(){
        var searchEl = document.createElement("button");
        searchEl.classList.add("buttons");
        searchEl.setAttribute('id', "buttons" + tracker);
        tracker++;

        searchEl.innerHTML = localStorage.getItem(index-1);
        searchHistroy.appendChild(searchEl);
        searchEl.style.listStyle = "none";

}

function displayWeather(data){

    console.log(data);
    weatherEl.innerHTML = JSON.stringify(data.main);
    currentWeather.appendChild(weatherEl);

}
function getWeather(name){
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=798857f5f7d6213943574838124df4c6"
    fetch(apiURL).then(function (response){
        if (response.ok){
            response.json().then(function(data){
                displayWeather(data);
            });
        }
    });
};

function handleOldButtons(event){
    event.preventDefault();
    var search = event.target.innerHTML;
    getWeather(search);



}
searchButton.addEventListener('click', handleSubmit);
searchHistroy.addEventListener('click', handleOldButtons);