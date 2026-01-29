import { useState } from "react";

import "./Weather.css";

export default function Weather() {

    const unitsDegrees = ["°C", "°F", "K"];
    const units = ["metric", "imperial", "standard"];
    // conditions: sunny, clouds, rain, snow, other
    const colors = ["#ffee8c", "#d3d3d3", "", "", "#a3b4d5"];

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState(1);

    const [gmt, setGmt] = useState("");

    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const setVals = (data) => {
        setWeather(data);

        var gmtTime = 0;
        gmtTime = data.timezone / 3600;
        setGmt(gmtTime);
    }

    const getWeather = async () => {
        if (!city) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units[unit]}&appid=${weatherApiKey}`
            );

            const data = await response.json();
            setVals(data);
        } catch (error) {
            console.error("Error getting weather:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2>Weather App</h2>
            <p>
                Please enter the name of your city below and hit <span style={{color: "#d8bfd8"}}>Get Weather</span> button.
                You can also change whether you want the temperature in Celsius or Fahrenheit (or Kelvin I suppose)
            </p>
            <div style={{padding: "20px", backgroundColor: colors[4], borderRadius: "100px"}}>
                <input
                    type="text"
                    placeholder="Enter your city..."
                    onChange={(e) => {
                        setCity(e.target.value);
                        setWeather({});
                    }}
                    style={{marginRight: "10px"}}
                    className="weather-input"
                />
                <button className="weather-button" onClick={getWeather}>Get Weather</button>

                <div style={{marginTop: "15px"}}>
                    <label>
                        Celsius
                        <input
                            type="radio"
                            name="celsius"
                            value="metric"
                            checked={units[unit] === "metric"}
                            onChange={(e) => setUnit(0)}
                        />
                    </label>
                    <label>
                        Fahrenheit
                        <input
                            type="radio"
                            name="fahrenheit"
                            value="imperial"
                            checked={units[unit] === "imperial"}
                            onChange={(e) => setUnit(1)}
                        />
                    </label>
                    <label>
                        Kelvin
                        <input
                            type="radio"
                            name="kelvin"
                            value="kelvin"
                            checked={units[unit] === "standard"}
                            onChange={(e) => setUnit(2)}
                        />
                    </label>
                </div>

                {loading && <p>Loading...</p>}

                {weather && weather.main && (
                  <div style={{marginTop: "30px"}}>
                    <h3>Weather in {weather.name} (GMT {gmt > 0 ? "+" : ""}{gmt}):</h3>
                    <p>Temperature: {weather.main.temp}{unitsDegrees[unit]}</p>
                    <p>Condition: {weather.weather[0].description}</p>
                  </div>
                )}
                {weather && weather.message === "city not found" && (
                    <h3>City <span style={{color: "rgb(255,0,0)", textDecoration: "underline"}}>{city}</span> was not found, please check spelling or try a different city</h3>
                )}
            </div>
        </>
    );
}
