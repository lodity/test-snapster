import React from "react";
import classes from "./SearchBlock.module.css";
import axios from "axios";

interface City {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const SearchBlock = () => {
  const API_KEY = "203bdd9f0ef531d41c46a1a9583ca5e4";
  const [inputValue, setInputValue] = React.useState("");
  const [city, setCity] = React.useState<City | null>(null);
  const [cityNotFound, setCityNotFound] = React.useState(false);

  const handleClick = async () => {
    try {
      const response = await axios.get<City>(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputValue}&appid=${API_KEY}`,
      );
      setCity(response.data);
      setCityNotFound(false);
    } catch (error: any) {
      if (error.response.status === 404) {
        setCityNotFound(true);
        setCity(null);
      }
    }
  };

  return (
    <div className={classes.main}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Enter city name"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={handleClick}>
          Search
        </button>
      </form>
      {city && (
        <div className={classes.city}>
          <p className={classes.cityTemp}>{city.main.temp}°C</p>
          <p className={classes.cityName}>{city.name}</p>
          <p className={classes.cityHumidity}>
            Humidity: {city.main.humidity}%
          </p>
          <p className={classes.cityWind}>Wind speed: {city.wind.speed} km/h</p>
        </div>
      )}
      {cityNotFound && (
        <div className={classes.cityNotFound}>City not found</div>
      )}
    </div>
  );
};

export default SearchBlock;
