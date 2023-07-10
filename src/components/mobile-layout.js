import { useState } from "react";
import logo from "../img/logo_web.png";
import menuIcon from "../img/icon_menu.png";
import searchIcon from "../img/icon_search_mobile.png";
import "../components/style.css";
import useUtilityContext from "../hooks/use-utility-context";

let todaysDate = new Date();

let todaysDate1 = todaysDate.toDateString();

let todaysTime = todaysDate.toLocaleTimeString("en-US", { hour12: true });

var currentDateTime = todaysDate1 + " " + todaysTime;

function MobileLayout() {
  const { getSearchData } = useUtilityContext();

  const { addToRecentData } = useUtilityContext();

  const [term, setTerm] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    getSearchData(term);
    addToRecentData();
    setTerm("");
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <div className="logo-search-mobile">
        <img src={menuIcon} alt="menuIcon" className="menuIcon" href="/menu" />
        <img
          src={logo}
          alt="Logo"
          className="logo-mobile"
          onClick={() => (window.location.href = "/")}
        />
        <img
          src={searchIcon}
          href="/search"
          alt="searchIcon"
          className="icon-search-white"
        />
      </div>
      <div className="datetime-mobile">{currentDateTime} </div>
    </div>
  );
}
export default MobileLayout;
