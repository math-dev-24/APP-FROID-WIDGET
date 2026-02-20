import { Link, useLocation } from "react-router-dom"
import { ExternalLink, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <img
              src="logo.png"
              alt="App Froid Logo"
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors">
              App Froid
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/settings" aria-label="Réglages">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <nav className="flex items-center gap-1 flex-wrap">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://app-froid.mathieu-busse.dev"
            aria-label="Ouvrir App-Froid dans un nouvel onglet"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mr-3 pr-3 border-r border-border no-underline hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            App-Froid
          </a>

          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/azote">Test Azote</NavLink>
          <NavLink to="/desp">DESP</NavLink>
          <NavLink to="/capteur-signal">Signal Capteur</NavLink>
          <NavLink to="/calcul-diam">Calcul Diamètre</NavLink>
          <NavLink to="/air-data">Air</NavLink>
          <NavLink to="/ruler">Règle</NavLink>
          <NavLink to="/simple">Simple</NavLink>
        </nav>
      </div>
    </header>
  )
}

const NavLink = ({ to, children }: { to: string; children: string }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      asChild
    >
      <Link
        to={to}
        className={cn(
          "no-underline",
          !isActive && "text-muted-foreground hover:text-foreground"
        )}
      >
        {children}
      </Link>
    </Button>
  )
}
