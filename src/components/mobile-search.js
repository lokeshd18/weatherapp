import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/style.css";
import useUtilityContext from "../hooks/use-utility-context";
import { VscArrowLeft } from "react-icons/vsc";

function MobileSearch() {
  let navigate = useNavigate();

  const { getSearchData } = useUtilityContext();

  const { addToRecentData } = useUtilityContext();

  const [term, setTerm] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    getSearchData(term);
    addToRecentData();
    setTerm("");
    navigate("/");
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div className="mobile-search">
      <div className="search-box-mobile">
        <button
          className="btnback"
          type="submit"
          onClick={() => (window.location.href = "/")}
        >
          <VscArrowLeft />
        </button>
        <form onSubmit={handleFormSubmit} action="/home">
          <input
            className="search-input placetext"
            value={term}
            onChange={handleChange}
            type="text"
            placeholder="Select for city"
          />
        </form>
      </div>
      <div className="searchline"></div>
    </div>
  );
}

export default MobileSearch;
