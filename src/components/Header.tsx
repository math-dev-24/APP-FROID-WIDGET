import { Link, useLocation } from "react-router-dom";

export default function Header() {

  return (
      <header>
        <div className="header-container">
          <div className="logo-container">
            <Link to="/" className="flex align-center">
              <img src="logo.png" alt="App Froid Logo" width="40" />
              <span className="app-title">App Froid</span>
            </Link>
          </div>

          <nav className="desktop-nav">
            <div className="external-link-container flex-col">
              <a
                  target="_blank"
                  href="https://app-froid.mathieu-busse.dev"
                  className="flex align-center external-link"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                App-Froid
              </a>
            </div>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/ruler">Réglette</NavLink>
            <NavLink to="/azote">Test Azote</NavLink>
            <NavLink to="/desp">DESP</NavLink>
            <NavLink to="/opti-hp">CO₂ Trans.</NavLink>
          </nav>
        </div>
      </header>
  );
}

// Composant NavLink pour la navigation desktop
const NavLink = ({ to, children }: { to: string; children: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
      <Link
          to={to}
          className={`nav-link ${isActive ? "active-nav" : ""}`}
      >
        {children}
      </Link>
  );
};
