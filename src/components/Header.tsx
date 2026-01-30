import { Link, useLocation } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid #333",
        backgroundColor: "#1a1a1a",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <img
              src="logo.png"
              alt="App Froid Logo"
              style={{ height: "32px", width: "32px" }}
            />
            <span
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#60a5fa",
              }}
            >
              App Froid
            </span>
          </Link>
        </div>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <a
            target="_blank"
            href="https://app-froid.mathieu-busse.dev"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.875rem",
              color: "#9ca3af",
              marginRight: "16px",
              paddingRight: "16px",
              borderRight: "1px solid #333",
              textDecoration: "none",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            App-Froid
          </a>

          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/azote">Test Azote</NavLink>
          <NavLink to="/desp">DESP</NavLink>
        </nav>
      </div>
    </header>
  );
}

const NavLink = ({ to, children }: { to: string; children: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      style={{
        padding: "6px 12px",
        fontSize: "0.875rem",
        fontWeight: "500",
        borderRadius: "6px",
        transition: "all 0.2s ease",
        textDecoration: "none",
        backgroundColor: isActive ? "#3b82f6" : "transparent",
        color: isActive ? "white" : "#9ca3af",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.target as HTMLElement).style.backgroundColor = "#333";
          (e.target as HTMLElement).style.color = "#e0e0e0";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.target as HTMLElement).style.backgroundColor = "transparent";
          (e.target as HTMLElement).style.color = "#9ca3af";
        }
      }}
    >
      {children}
    </Link>
  );
};
