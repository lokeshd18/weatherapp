import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import useUtilityContext from "../hooks/use-utility-context";
import defaultIcon from "..//img/icon_sunny.png";
import tempIcon from "..//img/icon_temperature.png";
import precipitationIcon from "../img/icon_precipitation.png";
import humidityIcon from "..//img/icon_humidity.png";
import windIcon from "..//img/icon_wind.png";
import visibilityIcon from "..//img/icon_visibility.png";
import { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import rain from "../img/icon_rain.png";
import mostlyCloudy from "../img/icon_mostly_cloudy.png";
import thunderstorm from "../img/icon_thunderstorm.png";
import clearNight from "../img/icon_clear_night.png";

function Home() {

  const { getSearchData } = useUtilityContext();

  useEffect(() => {
    getSearchData('udupi');
  }, []);

  const { createCity } = useUtilityContext();
  const { checkCityExits } = useUtilityContext();
  const { city } = useUtilityContext();

  let title = city.name;
  let countryID = city.sys.country;

  title = `${title}, ${countryID}`;

  let mainTemp = Math.floor(city.main.temp);

  let weatherDesc = city.weather[0].description;

  let minTemp = Math.floor(city.main.temp_min);
  let maxTemp = Math.floor(city.main.temp_max) + 2;

  let visib = Math.floor(city.visibility / 1000);

  const initialState = "Add to Favourite";
  const updatedState = "Added to Favourites";

  const [buttonText, setButtonText] = useState("Add to Favourite");

  useEffect(() => {
    if (buttonText !== initialState) {
      setButtonText("Added to Favourites");
    }
  }, []);

  let currentWeather = city.weather[0].icon;
  let FinalweatherIcon = defaultIcon;

  if (
    currentWeather === "02d" ||
    currentWeather === "03d" ||
    currentWeather === "04d" ||
    currentWeather === "02n" ||
    currentWeather === "03n" ||
    currentWeather === "04n"
  ) {
    FinalweatherIcon = mostlyCloudy;
  } else if (
    currentWeather === "09d" ||
    currentWeather === "10d" ||
    currentWeather === "09n" ||
    currentWeather === "10n"
  ) {
    FinalweatherIcon = rain;
  } else if (currentWeather === "11d" || currentWeather === "11n") {
    FinalweatherIcon = thunderstorm;
  } else if (currentWeather === "01n") {
    FinalweatherIcon = clearNight;
  }

  let newWeather = city.weather[0].icon;
  let weatherID = 0;

  // weatherID = 0 --> defaultIcon
  // weatherID = 1 --> mostlyCloudy
  // weatherID = 2 --> rain
  // weatherID = 3 --> thunderstorm
  // weatherID = 4 --> clearNight

  if (
    newWeather === "02d" ||
    newWeather === "03d" ||
    newWeather === "04d" ||
    newWeather === "02n" ||
    newWeather === "03n" ||
    newWeather === "04n"
  ) {
    weatherID = 1;
  } else if (
    newWeather === "09d" ||
    newWeather === "10d" ||
    newWeather === "09n" ||
    newWeather === "10n"
  ) {
    weatherID = 2;
  } else if (newWeather === "11d" || newWeather === "11n") {
    weatherID = 3;
  } else if (newWeather === "01n") {
    weatherID = 4;
  }

  const handleFavSubmit = (event) => {
    event.preventDefault();
    checkCityExits(title);
    createCity(title, weatherID, mainTemp, weatherDesc);
    setButtonText("Added to Favourites");
  };

  const [alignment, setAlignment] = useState("centigrade");
  const [tempToBeDisplayed, settempToBeDisplayed] = useState(mainTemp);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
      if (alignment== 'fahrenheit'){
      settempToBeDisplayed(mainTemp);
    }
    else
    settempToBeDisplayed(mainTemp+32);
  };

  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "red",
      backgroundColor: "white",
    },
  });

  // const updateFahrenheit = (event) => {
  //   event.preventDefault();
  //   settempToBeDisplayed(mainTemp+32);
  // }

  return (
    <div>
      <div></div>
      <div className="cityname">
        <h3>{title}</h3>
      </div>

      <div className="addtofav">
        {(function () {
          if (buttonText === "Added to Favourites") {
            return (
              <button
                className="fav-btn"
                type="submit"
                onClick={handleFavSubmit}
              >
                <VscHeartFilled />
              </button>
            );
          } else {
            return (
              <button className="btn" type="submit" onClick={handleFavSubmit}>
                <VscHeart />
              </button>
            );
          }
        })()}

        {(function () {
          if (buttonText === "Added to Favourites") {
            return <h6 className="favtext-fav">{buttonText}</h6>;
          } else {
            return <h6 className="favtext">{buttonText}</h6>;
          }
        })()}
      </div>

      <div className="temp-group">
        <img src={FinalweatherIcon} alt="weatherIcon" className="temp-image" />

        <div className="temp-cel-f">
          <div className="temp-value">
            <strong>{tempToBeDisplayed}</strong>
          </div>

          <div className="temp-metrics">
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="centigrade">°C</ToggleButton>
              <ToggleButton value="fahrenheit">°F</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <p className="temp-desc">{weatherDesc}</p>
      </div>

      <div className="home-line"> </div>

      <div className="weather-details">
        <div className="weatherbottom">
          <div>
            <img src={tempIcon} alt="tempIcon" />
          </div>
          <div className="weather1details">
            <div>Min - Max</div>
            <div>
              {minTemp}° - {maxTemp}°
            </div>
          </div>
        </div>

        <div className="weatherbottom">
          <div>
            <img src={precipitationIcon} alt="precipitationIcon" />
          </div>
          <div className="weather1details">
            <div>Precipitation</div>
            <div>70%</div>
          </div>
        </div>

        <div className="weatherbottom">
          <div>
            <img src={humidityIcon} alt="humidityIcon" />
          </div>
          <div className="weather1details">
            <div>Humidity</div>
            <div>{city.main.humidity} %</div>
          </div>
        </div>

        <div className="weatherbottom">
          <div>
            <img src={windIcon} alt="windIcon" />
          </div>
          <div className="weather1details">
            <div>Wind</div>
            <div>{city.wind.speed} KPH</div>
          </div>
        </div>

        <div className="weatherbottom">
          <div>
            <img src={visibilityIcon} alt="visibilityIcon" />
          </div>
          <div className="weather1details">
            <div>Visibility</div>
            <div>{visib} KM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
