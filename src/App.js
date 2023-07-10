import React,{useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/home";
import MobileHome from "./components/mobile-home";
import MobileSearch from "./components/mobile-search";
import MobileMenu from "./components/mobile-menu";
import Favourite from "./components/favourite";
import MobileFavourite from "./components/mobile-favourite";
import Recent from "./components/recent";
import MobileRecent from "./components/mobile-recent";
import { useMediaQuery } from "react-responsive";
import useUtilityContext from "./hooks/use-utility-context";



function App() {

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 499 });
    return isMobile ? children : null;
  };

  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 500 });
    return isNotMobile ? children : null;
  };

  return (
    <div>
      <Mobile>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MobileHome />} />
            <Route index element={<MobileHome />} />
            <Route path="/search" element={<MobileSearch />} />
            <Route path="/menu" element={<MobileMenu />} />
            <Route path="/favourite" element={<MobileFavourite />} />
            <Route path="/recentsearch" element={<MobileRecent />} />
          </Routes>
        </BrowserRouter>
      </Mobile>

      <Default>
        <Layout />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/recentsearch" element={<Recent />} />
          </Routes>
        </BrowserRouter>
      </Default>
    </div>
  );
}

export default App;
