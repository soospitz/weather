import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [type, setType] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: "",
    min: "",
    max: "",
    feel: "",
    humidity: "",
    desc: "",
    main: "",
    city: "",
  });

  const handleInputChange = (event) => {
    let value = checkInputType(event.target.value);
    setInput(value);
  };

  const checkInputType = (input) => {
    let regex = /[0-9]/;
    let type = "";
    if (input.match(regex)) {
      type = "zipcode";
    } else {
      type = "city";
    }
    setType(type);
    return input;
  };
  const handleClick = () => {
    fetch(
      type === "city"
        ? `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=1f747278bea90789bd8437272dc6268d`
        : `https://api.openweathermap.org/data/2.5/weather?zip=${input},us&appid=1f747278bea90789bd8437272dc6268d`
    )
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        let data = {
          temp: convertFarenheit(body.main.temp),
          min: convertFarenheit(body.main.temp_min),
          max: convertFarenheit(body.main.temp_max),
          feel: convertFarenheit(body.main.feels_like),
          humidity: body.main.humidity,
          desc: body.weather[0].description,
          main: body.weather[0].main,
          city: body.name,
        };
        setWeatherData(data);
      });
  };

  const convertFarenheit = (temp) => {
    return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
  };
  return (
    <div>
      <div className="container">
        <div className="left">
          <div className="title">
            <img src={"https://soospitz.github.io/weather/svg/weather.svg"} style={{ height: 55 }} />
            <h1>Weather</h1>
          </div>
          <div className="search">
            <input
              placeholder="City or Zip Code"
              onChange={handleInputChange}
              className="search-input"
            ></input>
            <i onClick={handleClick} class="fas fa-search" id="search"></i>
          </div>
        </div>
        <div className="right">
          {weatherData.temp === "" ? (
            <div></div>
          ) : (
            <div className="card">
              <div>
                <h1>{weatherData.city}</h1>
                <img
                  src={"https://soospitz.github.io/weather/svg/".concat(weatherData.main).concat(".svg")}
                  style={{ height: 140 }}
                />
                <h3 className="desc">{weatherData.desc}</h3>
              </div>

              <div>
                <h1 className="temp">{weatherData.temp}°</h1>

                <p>
                  <div className="light">H</div>
                  {weatherData.max}° <div className="light">L</div>
                  {weatherData.min}°
                </p>
                <p>
                  <div className="light">Feels like</div>
                  {weatherData.feel}°
                </p>
                <p>
                  <div className="light">Hummidity</div>
                  {weatherData.humidity}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer>© Soo Spitz 2020</footer>
    </div>
  );
}

export default App;
