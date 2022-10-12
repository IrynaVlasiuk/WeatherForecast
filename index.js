const API_KEY = "3039a4850be88fcabcfa139fbff8e545";
const apiCall = "https://api.openweathermap.org/data/2.5/weather?";

const crdByDefault = [
    {
        city: 'Kyiv',
        latitude: 50.450001,
        longitude: 30.523333
    },
    {
        city: 'London',
        latitude: 51.509865,
        longitude: -0.118092
    },
    {
        city: 'New York',
        latitude: 40.730610,
        longitude: -73.935242
    },
    {
        city: 'Paris',
        latitude: 48.864716,
        longitude: 2.349014
    },
]

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;
    let apiUrl = apiCall + "lat=" + crd.latitude + "&lon=" + crd.longitude + "&appid=" + API_KEY;

    getCurrentWeatherResponse(apiUrl, displayWeather);
}

function error(err) {
    let apiUrl = apiCall + "lat=" + crdByDefault[0].latitude + "&lon=" + crdByDefault[0].longitude + "&appid=" + API_KEY;
    getCurrentWeatherResponse(apiUrl, displayWeather);

    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

import {serviceWeather} from "./services/serviceWeather.js";
import {dateService} from "./services/dateService.js";
import {Weather} from "./classes/WeatherClass.js";

function getCurrentWeatherResponse(apiUrl, displayWeather) {
    fetch(apiUrl)
        .then(
            response => response.json()
        )
        .then(data => {
            if(data.cod == "200") {
                let weatherObj = new Weather(data);
                displayWeather(weatherObj);
            }
        })
        .catch(error => console.log(error.message));
}

function displayWeather(data) {
    document.querySelector(".left-section .img-info img").src = data.getImageSrc();

    serviceWeather.addDataToDOMElement(".left-section .location-info", data.getLocation());
    serviceWeather.addDataToDOMElement(".left-section .temperature-info .value", data.getTemperature());
    serviceWeather.addDataToDOMElement(".left-section .feels-like .value", data.temperatureFeelsLike);
    serviceWeather.addDataToDOMElement(".left-section .temperature-limits .min-value", data.minTemperature);
    serviceWeather.addDataToDOMElement(".left-section .temperature-limits .max-value", data.maxTemperature);
    serviceWeather.addDataToDOMElement(".left-section .weather-description-info", data.weatherDescription);
}

function displayWeatherForSearchCity(data) {
    document.querySelector(".main-weather").style.visibility = 'visible';
    document.querySelector(".center-section .img-info img").src = data.getImageSrc();

    serviceWeather.addDataToDOMElement(".center-section .location-info", data.getLocation());
    serviceWeather.addDataToDOMElement(".center-section .date-info", data.dayName);
    serviceWeather.addDataToDOMElement(".center-section .temperature-info .value", data.getTemperature());
    serviceWeather.addDataToDOMElement(".center-section .feels-like .value", data.temperatureFeelsLike);
    serviceWeather.addDataToDOMElement(".center-section .temperature-limits .min-value", data.minTemperature);
    serviceWeather.addDataToDOMElement(".center-section .temperature-limits .max-value", data.maxTemperature);
    serviceWeather.addDataToDOMElement(".center-section .temperature-limits .wind-info .value", data.getWindSpeed());
    serviceWeather.addDataToDOMElement(".center-section .weather-description-info", data.weatherDescription);
}

function displayWeatherForDefaultCitiesList(data) {
    let defaultCitiesWeather = document.querySelector(".default-cities-weather");
    let divEl = document.createElement("div");
    divEl.classList.add("city-weather");

    divEl.insertAdjacentHTML("afterbegin",
        "<div class='city-name'>" + data.cityName + "</div><div class='temp-value'>" + data.getTemperature() + "&#176; C</div>");

    defaultCitiesWeather.append(divEl);
}

crdByDefault.forEach(ob => {
    let apiUrl = apiCall + "q=" + ob.city + "&appid=" + API_KEY;

    getCurrentWeatherResponse(apiUrl, displayWeatherForDefaultCitiesList);
});

document.querySelector(".search-city").addEventListener("keypress", function (e) {
    if(e.key == "Enter") {
        let cityValue = e.target.value;

        if(!cityValue) {
            return;
        }

        let apiUrl = apiCall + "q=" + cityValue + "&appid=" + API_KEY;

        getCurrentWeatherResponse(apiUrl, displayWeatherForSearchCity);
    }
});

setInterval(() => displayCurrentData(), 1000);

function displayCurrentData() {
    document.querySelector(".right-section .time-info").innerText = dateService.getCurrentTime();
    document.querySelector(".right-section .date-info").innerText = dateService.getCurrentData();
}


