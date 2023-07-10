import { createContext, useState } from "react";
import axios from "axios";
import SearchCity from "../Api";

// Create a new Context
const utilityContext = createContext();

// Create Provider Function to add all the Function
function Provider({ children }) {
  const [cityList, setCityList] = useState([]);

  const fetchCities = async () => {
    const response = await axios.get("http://localhost:3001/cities");
    setCityList(response.data);
  };

  // Function for Deleting the Cities

  const deleteCityById = async (id) => {
    await axios.delete(`http://localhost:3001/cities/${id}`);

    const updatedCities = cityList.filter((city) => {
      return city.id !== id;
    });

    setCityList(updatedCities);
  };

  const [checkCity, setcheckCity] = useState([]);

  const checkCityExits = async (title) => {
    const checkCityResponse = await axios.get("http://localhost:3001/cities", {
      title,
    });
    setcheckCity(checkCityResponse.data);
  };

  // Function for Adding Favourite City
  const createCity = async (title, weatherID, mainTemp, weatherDesc) => {
    if (checkCity.length === 0) {
      const response = await axios.post("http://localhost:3001/cities", {
        title,
        weatherID,
        mainTemp,
        weatherDesc,
      });
      const updatedCities = [...cityList, response.data];
      setCityList(updatedCities);
    }
  };

  var myObject = {
    coord: {
      lon: 74.75,
      lat: 13.35,
    },
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 24.58,
      feels_like: 25.39,
      temp_min: 24.58,
      temp_max: 24.58,
      pressure: 1007,
      humidity: 88,
      sea_level: 1007,
      grnd_level: 1006,
    },
    visibility: 5202,
    wind: {
      speed: 7.26,
      deg: 280,
      gust: 11.16,
    },
    rain: {
      "1h": 0.12,
    },
    clouds: {
      all: 96,
    },
    dt: 1688383863,
    sys: {
      type: 1,
      id: 9217,
      country: "IN",
      sunrise: 1688344686,
      sunset: 1688391109,
    },
    timezone: 19800,
    id: 1253952,
    name: "Udupi",
    cod: 200,
  };

  const [city, setCity] = useState(myObject);

  const [recentList, setRecentList] = useState([]);

  const getSearchData = async (term) => {
    const results = await SearchCity(term);
    setCity(results);

    let title = results.name;
    let countryID = results.sys.country;
    title = `${title}, ${countryID}`;
    let mainTemp = Math.floor(results.main.temp);
    let weatherDesc = results.weather[0].description;

    let newWeather = results.weather[0].icon;
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

    // const exists = results.filter(item => item.title === title).length > 0;
    //  console.log("Exists? " + exists); // Exists: true

    
    console.log(cityList);
    
    console.log(cityList.length);
     for (let i=0; i < cityList.length; i++) {
      if (cityList[i].title === title)
      
      console.log(cityList[i].title);
      console.log(title);
      console.log("exits")

  }
   console.log("not exists")

    const response = await axios.post("http://localhost:3001/recentcities", {
      title,
      weatherID,
      mainTemp,
      weatherDesc,
    });

    const updatedRecent = [...recentList, response.data];
    setRecentList(updatedRecent);
   };

  // const addToRecentData = async () => {

  // };

  const fetchRecent = async () => {
    const response = await axios.get("http://localhost:3001/recentcities");
    setRecentList(response.data);
  };

  const Popup = (props) => {
    return (
      <div className="popup-box">
        <div className="box">{props.content}</div>
      </div>
    );
  };

  // Create a new object to share Functions which can be called from other components
  const valueToShare = {
    cityList,
    city,
    deleteCityById,
    createCity,
    fetchCities,
    getSearchData,
    // addToRecentData,
    fetchRecent,
    recentList,
    // removeFromRecent,
    checkCityExits,
    Popup,
  };

  return (
    <utilityContext.Provider value={valueToShare}>
      {children}
    </utilityContext.Provider>
  );
}

export { Provider };
export default utilityContext;
