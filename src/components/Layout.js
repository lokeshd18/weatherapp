import { useState } from "react";
import logo from "../img/logo_web.png";
import "../components/style.css";
import useUtilityContext from "../hooks/use-utility-context"

let todaysDate = new Date();

let todaysDate1 = todaysDate.toDateString();

let todaysTime = todaysDate.toLocaleTimeString("en-US", { hour12: true });

var currentDateTime = todaysDate1 + " " + todaysTime;

function Layout() {

  const { getSearchData } = useUtilityContext();

  // const { addToRecentData } = useUtilityContext();

  const [term, setTerm] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    getSearchData(term);
    // addToRecentData();
    setTerm("");
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <div className="logo-search">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => (window.location.href = "/")}
        />
        <div className="search-box">
          <input
            type="text"
            value={term}
            onChange={handleChange}
            placeholder="Search City"
          />
          <button type="submit" href="/" onClick={handleFormSubmit}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div>
        <ul className="ul">
          <li className="ul-li">
            <a
              className="home current"
              onClick={() => (window.location.href = "/")}
            >
              HOME
            </a>
          </li>

          <li className="ul-li">
            <a className="favourite" href="/favourite">
              FAVOURITE
            </a>
          </li>

          <li className="ul-li">
            <a className="recent-search" href="/recentsearch">
              RECENT SEARCH
            </a>
          </li>
          <li className="datetime-format">{currentDateTime}</li>
        </ul>
      </div>
      <div className="line"> </div>
      <div></div>
    </div>
  );
}
export default Layout;
