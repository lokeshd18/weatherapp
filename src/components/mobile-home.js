import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import useUtilityContext from "../hooks/use-utility-context";
import weatherIcon from "..//img/icon_sunny.png";
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
import logo from "../img/logo_web.png";
import menuIcon from "../img/icon_menu.png";
import searchIcon from "../img/icon_search_mobile.png";

let todaysDate = new Date();

let todaysDate1 = todaysDate.toDateString();

let todaysTime = todaysDate.toLocaleTimeString("en-US", { hour12: true });

var currentDateTime = todaysDate1 + " " + todaysTime;

function MobileHome() {
  const { getSearchData } = useUtilityContext();

  const { addToRecentData } = useUtilityContext();

  const [term, setTerm] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    getSearchData(term);
    addToRecentData();
    setTerm("");
  };

  // const handleChange = (event) => {
  //   setTerm(event.target.value);
  // };

  const { createCity } = useUtilityContext();
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

  const handleFavSubmit = (event) => {
    event.preventDefault();
    createCity(title, currentWeather, mainTemp, weatherDesc);
    setButtonText("Added to Favourites");
  };

  const [alignment, setAlignment] = useState("centigrade");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "red",
      backgroundColor: "white",
    },
  });

  let currentWeather = city.weather[0].icon;
  let FinalweatherIcon = weatherIcon;

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

  return (
    <div>
      <div className="logo-search-mobile">
        <a className="menuIcon" href="/menu">
          <img src={menuIcon} alt="menuIcon" />
        </a>
        <img
          src={logo}
          alt="Logo"
          className="logo-mobile"
          onClick={() => (window.location.href = "/")}
        />
        <a className="icon-search-white" href="/search">
          <img src={searchIcon} alt="searchIcon" />
        </a>
      </div>
      <div className="datetime-mobile">{currentDateTime} </div>
      <div></div>
      <div className="cityname-mobile">
        <h3>{title}</h3>
      </div>
      <div className="addtofav-mobile">
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

      <div className="temp-group-mobile">
        <img src={FinalweatherIcon} alt="weatherIcon" className="temp-image" />

        <div className="temp-cel-f">
          <div className="temp-value-mobile">
            <strong>{mainTemp}</strong>
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

      <div className="weather-details-mobile">
        <div className="weatherbottom-mobile">
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

        <div className="weatherbottom-mobile">
          <div>
            <img src={precipitationIcon} alt="precipitationIcon" />
          </div>
          <div className="weather1details">
            <div>Precipitation</div>
            <div>70%</div>
          </div>
        </div>

        <div className="weatherbottom-mobile">
          <div>
            <img src={humidityIcon} alt="humidityIcon" />
          </div>
          <div className="weather1details">
            <div>Humidity</div>
            <div>{city.main.humidity} %</div>
          </div>
        </div>

        <div className="weatherbottom-mobile">
          <div>
            <img src={windIcon} alt="windIcon" />
          </div>
          <div className="weather1details">
            <div>Wind</div>
            <div>{city.wind.speed} KPH</div>
          </div>
        </div>

        <div className="weatherbottom-mobile">
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

export default MobileHome;
