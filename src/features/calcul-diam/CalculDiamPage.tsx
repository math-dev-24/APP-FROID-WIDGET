import { useMemo } from "react"
import {
  Layers,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Gauge,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileBarChart,
  Droplets,
  Wind,
} from "lucide-react"
import InputCustom from "@/components/InputCustom"
import useForm from "@/hooks/useForm"
import StatusBadge from "@/components/StatusBadge"
import { LIST_DIAM_PIPE } from "@/features/shared/pipes.data"
import { calcSection, calculateResult } from "@/features/calcul-diam/calculDiam.utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type CalculMode = "vitesse" | "debit"
type GasType = "gaz" | "liq"

const LIST_NAME_DIAM = LIST_DIAM_PIPE.map((e) => e.name)

export default function CalculDiamPage() {
  const { formValues, setValueByKey } = useForm(
    {
      diameter: "1/4",
      valDiamSearch: 1,
      longueur: 1,
      calculMode: "debit" as CalculMode,
      gasType: "liq" as GasType,
    },
    { storageKey: "calcul-diam" }
  )

  const diameter = formValues.diameter as string
  const valDiamSearch = formValues.valDiamSearch as number
  const longueur = formValues.longueur as number
  const calculMode = formValues.calculMode as CalculMode
  const gasType = formValues.gasType as GasType

  const diamData = useMemo(
    () => LIST_DIAM_PIPE.find((d) => d.name === diameter) ?? LIST_DIAM_PIPE[0],
    [diameter]
  )

  const result = useMemo(
    () => calculateResult(diamData, valDiamSearch, calculMode),
    [diamData, valDiamSearch, calculMode]
  )

  const formattedResult = useMemo(() => {
    const unit = calculMode === "vitesse" ? "m³/h" : "m/s"
    return `${result} ${unit}`
  }, [result, calculMode])

  const formattedDiameter = useMemo(() => {
    if (!diamData) return ""
    if (diamData.name.includes("/")) {
      return `${diamData.name}" (${diamData.diam_int} mm)`
    }
    return `${diamData.name} (${diamData.diam_int} mm)`
  }, [diamData])

  const volumeCalc = useMemo(() => {
    const { m_c: sectionM } = calcSection(diamData.diam_int)
    const volumeM3 = longueur * sectionM
    const volumeL = volumeM3 * 1000
    return {
      m3: parseFloat(volumeM3.toFixed(6)),
      liters: parseFloat(volumeL.toFixed(3)),
    }
  }, [diamData, longueur])

  const speedRecommendation = useMemo(() => {
    if (gasType === "liq")
      return { min: 0.5, max: 1.5, label: "Liquide", description: "Vitesses équilibrées" }
    if (gasType === "gaz")
      return { min: 0.5, max: 15, label: "Gaz", description: "Vitesses faibles recommandées" }
    return { min: 0.5, max: 1.5, label: "Liquide", description: "Vitesses équilibrées" }
  }, [gasType])

  const currentSpeed = useMemo(
    () => (calculMode === "vitesse" ? valDiamSearch : result),
    [calculMode, result, valDiamSearch]
  )

  const speedEvaluation = useMemo(() => {
    const { min, max } = speedRecommendation

    if (currentSpeed < min) {
      return {
        status: "warning" as const,
        label: "Basse",
        message: "Vitesse inférieure aux recommandations pour ce diamètre",
      }
    } else if (currentSpeed <= max) {
      return {
        status: "success" as const,
        label: "Optimale",
        message: "Vitesse dans la plage recommandée pour ce diamètre",
      }
    } else {
      return {
        status: "error" as const,
        label: "Élevée",
        message: "Risque de pertes de charge importantes et de bruit",
      }
    }
  }, [currentSpeed, speedRecommendation])

  const equations = useMemo(() => {
    const section = calcSection(diamData.diam_int).m_c.toExponential(4)
    return {
      vitesse: "Débit = Vitesse × Section × 3600",
      debit: "Vitesse = Débit ÷ (Section × 3600)",
      sectionValue: section,
      calcVitesse: `Vitesse = ${valDiamSearch} ÷ (${section} × 3600) = ${result} m/s`,
      calcDebit: `Débit = ${valDiamSearch} × ${section} × 3600 = ${result} m³/h`,
    }
  }, [diamData, valDiamSearch, result])

  const sectionData = useMemo(
    () => calcSection(diamData.diam_int),
    [diamData]
  )

  const speedBarPosition = useMemo(() => {
    const { max } = speedRecommendation
    const clamped = Math.min(Math.max(currentSpeed, 0), max * 1.2)
    return Math.round((clamped / (max * 1.2)) * 100)
  }, [currentSpeed, speedRecommendation])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <header className="mb-4">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <Layers className="h-5 w-5 text-primary" aria-hidden />
          Calculateur Vitesse-Débit en Tuyauterie
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Conversion entre vitesse d'écoulement et débit volumique
        </p>
      </header>

      <section
        className={cn(
          "rounded-xl border-2 p-5 mb-5 transition-colors",
          speedEvaluation.status === "success" &&
            "border-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-900/20",
          speedEvaluation.status === "warning" &&
            "border-amber-500/50 bg-amber-50/40 dark:bg-amber-900/20",
          speedEvaluation.status === "error" &&
            "border-red-500/50 bg-red-50/40 dark:bg-red-900/20"
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {calculMode === "vitesse"
                ? "Débit volumique calculé"
                : "Vitesse d'écoulement calculée"}
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums">
              {formattedResult}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Diamètre {formattedDiameter} · Section {sectionData.mm_c} mm²
            </p>
          </div>
          <StatusBadge
            variant={speedEvaluation.status}
            label={speedEvaluation.label}
            className="shrink-0"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden />
              Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="block text-sm font-medium mb-2" id="calcul-mode-label">
                Que souhaitez-vous calculer ?
              </Label>
              <div
                className="flex rounded-lg overflow-hidden border border-border"
                role="tablist"
                aria-labelledby="calcul-mode-label"
              >
                <button
                  type="button"
                  role="tab"
                  aria-pressed={calculMode === "vitesse"}
                  aria-label="Calculer le débit à partir de la vitesse d'écoulement"
                  onClick={() => setValueByKey("calculMode", "vitesse")}
                  className={cn(
                    "flex-1 py-2.5 px-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    calculMode === "vitesse"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Gauge className="h-4 w-4" aria-hidden />
                  Vitesse → Débit
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-pressed={calculMode === "debit"}
                  aria-label="Calculer la vitesse à partir du débit volumique"
                  onClick={() => setValueByKey("calculMode", "debit")}
                  className={cn(
                    "flex-1 py-2.5 px-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    calculMode === "debit"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <TrendingUp className="h-4 w-4" aria-hidden />
                  Débit → Vitesse
                </button>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                <Info className="h-3.5 w-3.5 shrink-0" />
                {calculMode === "vitesse"
                  ? "Entrez la vitesse (m/s), obtenez le débit (m³/h)"
                  : "Entrez le débit (m³/h), obtenez la vitesse (m/s)"}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">Diamètre du tuyau</Label>
              <Select value={diameter} onValueChange={(v) => setValueByKey("diameter", v)}>
                <SelectTrigger className="mt-2 bg-background">
                  <SelectValue placeholder="Sélectionnez un diamètre" />
                </SelectTrigger>
                <SelectContent>
                  {LIST_NAME_DIAM.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="bg-muted/60 rounded-lg p-2.5 text-center">
                  <span className="text-xs text-muted-foreground">Intérieur</span>
                  <p className="text-sm font-semibold">{diamData.diam_int} mm</p>
                </div>
                <div className="bg-muted/60 rounded-lg p-2.5 text-center">
                  <span className="text-xs text-muted-foreground">Section</span>
                  <p className="text-sm font-semibold">{sectionData.mm_c} mm²</p>
                </div>
              </div>
            </div>

            <div>
              <InputCustom
                label="Longueur du tuyau"
                value={longueur}
                setValue={(v) => setValueByKey("longueur", v)}
                min={0}
                step={0.1}
                unit="m"
              />
              <div className="mt-2 p-2.5 bg-muted/50 rounded-lg">
                <span className="text-xs text-muted-foreground">Volume dans le tuyau</span>
                <div className="flex gap-4 mt-1 text-sm font-medium">
                  <span>{volumeCalc.m3} m³</span>
                  <span>{volumeCalc.liters} L</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="block text-sm font-medium mb-2">Type de fluide</Label>
              <div
                className="flex rounded-lg overflow-hidden border border-border"
                role="group"
                aria-label="Type de fluide"
              >
                <button
                  type="button"
                  aria-pressed={gasType === "gaz"}
                  aria-label="Gaz - vitesses faibles recommandées"
                  onClick={() => setValueByKey("gasType", "gaz")}
                  className={cn(
                    "flex-1 py-2.5 px-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    gasType === "gaz"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Wind className="h-4 w-4" aria-hidden />
                  Gaz
                </button>
                <button
                  type="button"
                  aria-pressed={gasType === "liq"}
                  aria-label="Liquide - vitesses équilibrées"
                  onClick={() => setValueByKey("gasType", "liq")}
                  className={cn(
                    "flex-1 py-2.5 px-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    gasType === "liq"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Droplets className="h-4 w-4" aria-hidden />
                  Liquide
                </button>
              </div>
            </div>

            <InputCustom
              label={
                calculMode === "vitesse"
                  ? "Vitesse d'écoulement"
                  : "Débit volumique"
              }
              value={valDiamSearch}
              setValue={(v) => setValueByKey("valDiamSearch", v)}
              step={0.1}
              min={0}
              unit={calculMode === "vitesse" ? "m/s" : "m³/h"}
            />
            <p
              className={cn(
                "flex items-center gap-1.5 text-xs",
                speedEvaluation.status === "success" && "text-emerald-600 dark:text-emerald-400",
                speedEvaluation.status === "warning" && "text-amber-600 dark:text-amber-400",
                speedEvaluation.status === "error" && "text-red-600 dark:text-red-400"
              )}
            >
              {speedEvaluation.status === "success" ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden />
              )}
              {speedEvaluation.message}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileBarChart className="h-4 w-4 text-primary" aria-hidden />
              Détails & Formules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border border-border p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" aria-hidden />
                Plage recommandée
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span className="font-medium text-foreground">
                    Vitesse actuelle : {currentSpeed} m/s
                  </span>
                  <span>{speedRecommendation.max} m/s</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500"
                    style={{ width: "100%" }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-5 -ml-0.5 rounded-full bg-foreground shadow-md border-2 border-background"
                    style={{ left: `${Math.min(speedBarPosition, 98)}%` }}
                    aria-hidden
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">{speedRecommendation.label}</span> :{" "}
                  {speedRecommendation.description}
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="text-sm font-medium mb-2">Formule utilisée</h3>
              <code className="block text-sm font-mono bg-background p-3 rounded-md border border-border">
                {calculMode === "vitesse" ? equations.vitesse : equations.debit}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                Section = {equations.sectionValue} m²
              </p>
              <code className="mt-2 block text-xs font-mono bg-background p-2 rounded border border-border text-muted-foreground">
                {calculMode === "vitesse" ? equations.calcDebit : equations.calcVitesse}
              </code>
            </div>

            <div className="flex justify-center py-4">
              <div className="relative flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                  {calculMode === "vitesse" ? (
                    <ArrowRight className="h-8 w-8 text-primary" aria-hidden />
                  ) : (
                    <TrendingUp className="h-8 w-8 text-primary" aria-hidden />
                  )}
                </div>
                <p className="mt-2 text-xs font-medium text-muted-foreground text-center">
                  {calculMode === "vitesse"
                    ? `v = ${valDiamSearch} m/s`
                    : `Q = ${valDiamSearch} m³/h`}
                </p>
                <p className="text-xs text-muted-foreground">{formattedDiameter}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-5 text-xs text-muted-foreground bg-muted/30 rounded-lg p-4">
        <p className="font-medium text-foreground mb-1">À propos</p>
        <p>
          Les vitesses optimales varient selon le diamètre et l'application. Vitesses trop faibles
          → efficacité réduite ; trop élevées → pertes de charge et bruit.
        </p>
      </footer>
    </main>
  )
}
