import useUtilityContext from "../hooks/use-utility-context";
import { useEffect, useState } from "react";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import rain from "../img/icon_rain.png";
import mostlyCloudy from "../img/icon_mostly_cloudy.png";
import thunderstorm from "../img/icon_thunderstorm.png";
import clearNight from "../img/icon_clear_night.png";
import mostlySunny from "../img/icon_mostly_sunny.png";
import axios from "axios";

function Recent() {
  const { fetchRecent } = useUtilityContext();

  const { createCity } = useUtilityContext();

  const { recentList } = useUtilityContext();

  const [column, setcolumn] = useState([]);

  const [Fav, setFav] = useState([]);

  // const initialState = "Add to Favourite";
  // const updatedState = "Added to Favourites";

  const [buttonText, setButtonText] = useState("Add to Favourite");

  useEffect(() => {
    if (recentList.length > 0) {
      setcolumn(Object.keys(recentList[0]));
    }
  }, [recentList]);

  useEffect(() => {
    fetchRecent();
  }, []);

  const handleFavSubmit = async (id) => {
    const response = await axios.get(
      `http://localhost:3001/recentcities/${id}`
    );

    let title = response.data.title;
    let icon = response.data.icon;
    let mainTemp = response.data.mainTemp;
    let weatherDesc = response.data.weatherDesc;

    createCity(title, icon, mainTemp, weatherDesc);
    setButtonText("Added to Favourites");
  };

  const deleteAllPosts = () => {
    // const postsIdsArray = cityList.map((post) => post.id)
    // postsIdsArray.forEach((id) => deleteCityById(id));
  };

  return (
    <div>
      <div className="fav1">
        <div>
          <p className="pfav">You recently searched for</p>
        </div>
        <div>
          <button
            className="fav-removeAll"
            type="submit"
            onClick={deleteAllPosts}
          >
            Clear All
          </button>
        </div>
      </div>
      <table className="data-seperator">
        <tbody>
          {recentList.map((data) => (
            <tr key={data.id}>
              <td className="td-title">{data.title}</td>

              {(function () {
                        if (data.weatherID === 1) {
                          return (
                            <td>
                              <img src={mostlyCloudy} alt="weatherIcon" />
                            </td>
                          );
                        } else if (data.weatherID === 2) {
                          return (
                            <td>
                              <img src={rain} alt="weatherIcon" />
                            </td>
                          );
                        } else if (data.weatherID === 3) {
                          return (
                            <td>
                              <img src={thunderstorm} alt="weatherIcon" />
                            </td>
                          );
                        } else if (data.weatherID === 4) {
                          return (
                            <td>
                              <img src={clearNight} alt="weatherIcon" />
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              <img src={mostlySunny} alt="weatherIcon" />
                            </td>
                          );
                        }
                      })()}

              <td className="td-mainTemp">
                <strong>{data.mainTemp}</strong> °c
              </td>
              <td>{data.weatherDesc}</td>

              {(function () {
                if (buttonText === "Added to Favourites") {
                  return (
                    <td>
                      <button
                        className="fav-btn"
                        type="submit"
                        onClick={() => handleFavSubmit(data.id)}
                      >
                        <VscHeartFilled />
                      </button>
                    </td>
                  );
                } else {
                  return (
                    <td>
                      <button
                        className="btn"
                        type="submit"
                        onClick={() => handleFavSubmit(data.id)}
                      >
                        <VscHeart />
                      </button>
                    </td>
                  );
                }
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Recent;
