import { Link, useLocation } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div>
        <h1 className="flex align-center">
          <img src="logo.png" width="50" />
          <span>App Froid</span>
        </h1>
      </div>
      <nav>
        <div>
          <a target="_blank" href="https://app-froid.mathieu-busse.dev" className="flex align-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"
              />
            </svg>
            App-Froid
          </a>
        </div>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/ruler" >Réglette frigorifique</NavLink>
        <NavLink to="/opti-hp">Pression optimum CO2 transcritique</NavLink>
      </nav>
    </header>
  );
}


const NavLink = ({ to, children }: {to: string, children: string}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={` ${
        isActive ? "active-nav" : ""
      }`}
    >
      {children}
    </Link>
  );
};
