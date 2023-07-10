import useUtilityContext from "../hooks/use-utility-context";
import { useEffect, useState } from "react";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import rain from "../img/icon_rain.png";
import mostlyCloudy from "../img/icon_mostly_cloudy.png";
import thunderstorm from "../img/icon_thunderstorm.png";
import clearNight from "../img/icon_clear_night.png";
import mostlySunny from "../img/icon_mostly_sunny.png";
import nothing from "../img/icon_nothing.png";
import { VscArrowLeft } from "react-icons/vsc";
import { VscSearch } from "react-icons/vsc";

function MobileFavourite() {
  const { fetchCities } = useUtilityContext();
  const { deleteCityById } = useUtilityContext();
  const { cityList } = useUtilityContext();
  const [column, setcolumn] = useState([]);
  const { Popup } = useUtilityContext();

  // const [data, setData] = useState([]);

  useEffect(() => {
    if (cityList.length > 0) {
      setcolumn(Object.keys(cityList[0]));
    }
  }, [cityList]);

  useEffect(() => {
    fetchCities();
  }, []);

  const removeFromFav = (id) => {
    console.log("calling delete func");
    console.log(id);
    deleteCityById(id);
  };

  const deleteAllPosts = () => {
    console.log("All the favourites will be removed");
    // const postsIdsArray = cityList.map((post) => post.id)
    // postsIdsArray.forEach((id) => deleteCityById(id));
    togglePopup();
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
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
            <strong>Favourite</strong>
          </label>
          <a className="icon-search-black" href="/search">
            <VscSearch />
          </a>
        </div>
      </div>

      {(function () {
        if (cityList.length > 0) {
          return (
            <div>
              <div className="fav1-mobile">
                <div>
                  <p className="pfav-mobile">
                    {cityList.length} City added as favourite
                  </p>
                </div>
                <div>
                  <input
                    type="button"
                    value="Remove All"
                    className="fav-removeAll-mobile"
                    onClick={togglePopup}
                  />
                  {isOpen && (
                    <Popup
                      content={
                        <>
                          <p className="popup-p">
                            Are you sure want to remove all the favourites?
                          </p>
                          <div className="popup-buttons">
                            <button className="no" onClick={togglePopup}>
                              NO
                            </button>
                            <button className="yes" onClick={deleteAllPosts}>
                              YES
                            </button>
                          </div>
                        </>
                      }
                      handleClose={togglePopup}
                    />
                  )}
                </div>
              </div>
              <table className="data-seperator-mobile">
                <tbody>
                  {cityList.map((data) => (
                    <tr key={data.id}>
                      <div className="concate">
                        <td className="td-title-mobile">{data.title}</td>
                        <td>
                          <button
                            className="fav-btn-mobile"
                            type="submit"
                            onClick={() => removeFromFav(data.id)}
                          >
                            <VscHeartFilled />
                          </button>
                        </td>
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
              <div className="nofav-description"> No Favourites added</div>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default MobileFavourite;
