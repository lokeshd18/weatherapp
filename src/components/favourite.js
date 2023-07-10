import useUtilityContext from "../hooks/use-utility-context";
import { useEffect, useState } from "react";
import { VscHeartFilled } from "react-icons/vsc";
import rain from "../img/icon_rain.png";
import mostlyCloudy from "../img/icon_mostly_cloudy.png";
import thunderstorm from "../img/icon_thunderstorm.png";
import clearNight from "../img/icon_clear_night.png";
import mostlySunny from "../img/icon_mostly_sunny.png";
import nothing from "../img/icon_nothing.png";

function Favourite() {
  const { fetchCities } = useUtilityContext();
  const { deleteCityById } = useUtilityContext();
  const { cityList } = useUtilityContext();
  const { Popup } = useUtilityContext();

  const [column, setcolumn] = useState([]);

  useEffect(() => {
    if (cityList.length > 0) {
      setcolumn(Object.keys(cityList[0]));
    }
  }, [cityList]);

  useEffect(() => {
    fetchCities();
  }, []);

  const removeFromFav = (id) => {
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
      {(function () {
        if (cityList.length > 0) {
          return (
            <div>
              <div className="fav1">
                <div>
                  <p className="pfav">
                    {cityList.length} City added as favourite
                  </p>
                </div>
                <div>
                  <input
                    type="button"
                    value="Remove All"
                    className="fav-removeAll"
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
              <table className="data-seperator">
                <tbody>
                  {cityList.map((data) => (
                    <tr key={data.id}>
                      <td className="td-title">{data.title}</td>

                      {/* weatherID = 0 --> defaultIcon
weatherID = 1 --> mostlyCloudy
weatherID = 2 --> rain
weatherID = 3 --> thunderstorm
weatherID = 4 --> clearNight */}

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
                      <td>
                        <button
                          className="fav-btn"
                          type="submit"
                          onClick={() => removeFromFav(data.id)}
                        >
                          <VscHeartFilled />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        } else {
          return (
            <div className="logo-nofav-group">
              <img src={nothing} alt="No Favourites" className="nofav-image" />
              <div className="nofav-description"> No Favourites added</div>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default Favourite;
