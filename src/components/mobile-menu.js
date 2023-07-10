import "../components/style.css";

function MobileMenu() {
  return (
    <div className="mobile-menu">
      <ul className="mobile-ul">
        <li>
          <a className="home" onClick={() => (window.location.href = "/")}>
            Home
          </a>
        </li>

        <li>
          <a className="favourite" href="/favourite">
            Favourite
          </a>
        </li>

        <li>
          <a className="recent-search" href="/recentsearch">
            Recent Search
          </a>
        </li>
      </ul>
    </div>
  );
}

export default MobileMenu;
