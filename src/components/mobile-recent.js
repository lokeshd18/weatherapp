import useUtilityContext from "../hooks/use-utility-context";
import { useEffect, useState } from "react";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { VscSearch } from "react-icons/vsc";
import rain from "../img/icon_rain.png";
import mostlyCloudy from "../img/icon_mostly_cloudy.png";
import thunderstorm from "../img/icon_thunderstorm.png";
import clearNight from "../img/icon_clear_night.png";
import mostlySunny from "../img/icon_mostly_sunny.png";
import nothing from "../img/icon_nothing.png";
import { VscArrowLeft } from "react-icons/vsc";
import axios from "axios";

function MobileRecent() {
  const { fetchRecent } = useUtilityContext();

  const { createCity } = useUtilityContext();

  const { removeFromRecent } = useUtilityContext();

  const { recentList } = useUtilityContext();

  const [column, setcolumn] = useState([]);

  const [Fav, setFav] = useState([]);

  const initialState = "Add to Favourite";
  const updatedState = "Added to Favourites";

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
    // console.log(title);
    // console.log(icon);
    // console.log(mainTemp);
    // console.log(weatherDesc);
    createCity(title, icon, mainTemp, weatherDesc);
    setButtonText("Added to Favourites");
  };

  const deleteAllPosts = () => {
    // const postsIdsArray = cityList.map((post) => post.id)
    // postsIdsArray.forEach((id) => deleteCityById(id));
  };

  return (
    <div>
      <div className="top-search-bar">
        <div class="top-search-box-mobile">
          <button
            className="btnback"
            type="submit"
            onClick={() => (window.location.href = "/")}
          >
            <VscArrowLeft />
          </button>
          <label className="FavBar">
            <strong>Recent Search</strong>
          </label>

          <a className="icon-search-black" href="/search">
            <VscSearch />
          </a>
        </div>
      </div>

      {(function () {
        if (recentList.length > 0) {
          return (
            <div>
              <div className="fav1-mobile">
                <div>
                  <p className="pfav-mobile">You recently searched for</p>
                </div>
                <div>
                  <button
                    className="fav-removeAll-mobile"
                    type="submit"
                    onClick={deleteAllPosts}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <table className="data-seperator-mobile">
                <tbody>
                  {recentList.map((data) => (
                    <tr key={data.id}>
                      <div className="concate">
                        <td className="td-title-mobile">{data.title}</td>
                        {(function () {
                          if (buttonText === "Added to Favourites") {
                            return (
                              <td>
                                <button
                                  className="fav-btn-mobile"
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
                                  className="btn-mobile"
                                  type="submit"
                                  onClick={() => handleFavSubmit(data.id)}
                                >
                                  <VscHeart />
                                </button>
                              </td>
                            );
                          }
                        })()}
                      </div>

                      {(function () {
                        if (data.weatherID === 1) {
                          return (
                            <td>
                              <img src={mostlyCloudy} alt="weatherIcon" />{" "}
                              <strong>{data.mainTemp} </strong> °c{" "}
                              <span>{data.weatherDesc}</span>{" "}
                            </td>
                          );
                        } else if (data.weatherID === 2) {
                          return (
                            <td>
                              <img src={rain} alt="weatherIcon" />{" "}
                              <strong>{data.mainTemp} </strong> °c{" "}
                              <span>{data.weatherDesc}</span>{" "}
                            </td>
                          );
                        } else if (data.weatherID === 3) {
                          return (
                            <td>
                              <img src={thunderstorm} alt="weatherIcon" />{" "}
                              <strong>{data.mainTemp} </strong> °c{" "}
                              <span>{data.weatherDesc}</span>{" "}
                            </td>
                          );
                        } else if (data.weatherID === 4) {
                          return (
                            <td>
                              <img src={clearNight} alt="weatherIcon" />{" "}
                              <strong>{data.mainTemp} </strong> °c{" "}
                              <span>{data.weatherDesc}</span>{" "}
                            </td>
                          );
                        } else {
                          return (
                            <td>
                              <img src={mostlySunny} alt="weatherIcon" />{" "}
                              <strong>{data.mainTemp} </strong> °c{" "}
                              <span>{data.weatherDesc}</span>{" "}
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
        } else {
          return (
            <div className="logo-nofav-group-mobile">
              <img src={nothing} alt="No Favourites" />
              <div className="nofav-description"> No Recent Search</div>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default MobileRecent;
