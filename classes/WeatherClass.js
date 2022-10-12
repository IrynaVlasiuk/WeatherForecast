import {serviceWeather} from "../services/serviceWeather.js";
import {dateService} from "../services/dateService.js";

export class Weather {
    cityName;
    countryAbr;
    maxTemperature;
    minTemperature;
    temperatureFeelsLike;
    weatherDescription;
    dayName;

    constructor(data) {
        this.cityName = data.name;
        this.countryAbr = data.sys.country;
        this.setTemperature(data.main.temp);
        this.setImageSrc(data.weather[0].main);
        this.temperatureFeelsLike = serviceWeather.temperatureConverter(data.main.feels_like);
        this.maxTemperature = serviceWeather.temperatureConverter(data.main.temp_max);
        this.minTemperature = serviceWeather.temperatureConverter(data.main.temp_min);
        this.weatherDescription = data.weather[0].description;
        this.dayName = dateService.getDayName(data.dt);
        this.setWindSpeed(data.wind.speed);
    }

    setTemperature(value) {
        this._temperature = serviceWeather.temperatureConverter(value);
    }

    getTemperature() {
        return this._temperature;
    }

    getLocation() {
        return `${this.cityName} , ${this.countryAbr}`;
    }

    setImageSrc(value) {
        let imgExtension = dateService.isDay() ? "_day.png" : "_night.png";
        this._imageSrc = "images/icons/" + value.toLowerCase() + imgExtension;
    }

    getImageSrc() {
        return this._imageSrc;
    }

    setWindSpeed(value) {
        this._windSpeed = value + "m/s";
    }

    getWindSpeed() {
        return this._windSpeed;
    }

}