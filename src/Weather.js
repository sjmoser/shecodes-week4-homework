import React, { useState } from "react";
import axios from "axios";
export default function Weather(props) {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6632ae1c5ce039c21cbcc5b78a4a6d00&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSearch}>
      <input type="search" placeholder="Enter a city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul className="Results">
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Humidity: {Math.round(weather.humidity)}%</li>
          <li>Wind: {Math.round(weather.wind)} km/h</li>
          <li>Description: {weather.description}</li>
          <li>
            <img src={weather.icon} alt="Weather icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
