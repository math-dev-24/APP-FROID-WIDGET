import { type LucideIcon, Heart, Thermometer, Gauge, Signal, Layers, Cloud, Ruler, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Tool {
  to: string
  icon: LucideIcon
  label: string
}

const TOOLS: Tool[] = [
  { to: "/azote", icon: Gauge, label: "Test Azote" },
  { to: "/desp", icon: Thermometer, label: "DESP" },
  { to: "/capteur-signal", icon: Signal, label: "Signal Capteur" },
  { to: "/calcul-diam", icon: Layers, label: "Calcul Diamètre" },
  { to: "/air-data", icon: Cloud, label: "Propriétés Air" },
  { to: "/ruler", icon: Ruler, label: "Règle" },
  { to: "/simple", icon: Zap, label: "Calcul Simple" },
]

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Bienvenue sur App Froid
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Accédez instantanément à vos outils grâce à ce widget pratique,
          disponible à tout moment dans votre navigateur !
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Outils disponibles</CardTitle>
          <CardDescription>Calculs et références pour le froid</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {TOOLS.map((tool) => (
              <ToolLink key={tool.to} {...tool} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button asChild variant="default" size="sm">
          <a
            href="https://buymeacoffee.com/mathieub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 no-underline"
          >
            <Heart className="h-4 w-4" />
            Soutenir le projet
          </a>
        </Button>
      </div>
    </div>
  )
}

function ToolLink({ to, icon: Icon, label }: Tool) {
  return (
    <Link to={to} className="block group">
      <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition-all duration-200 hover:bg-accent/60 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
          <Icon className="h-4 w-4 text-primary transition-transform duration-200 group-hover:scale-110" />
        </div>
        <span className="font-medium text-sm">{label}</span>
      </div>
    </Link>
  )
}
