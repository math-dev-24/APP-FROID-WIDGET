import { useMemo } from "react"
import { Info, Gauge, SlidersHorizontal, Box } from "lucide-react"
import InputCustom from "@/components/InputCustom"
import useForm from "@/hooks/formState"
import { getPFinal } from "@/features/azote/azote.utils"
import StatusBadge from "@/components/StatusBadge"
import StatusMessage from "@/components/StatusMessage"
import { formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AzotePage() {
  const { formValues, setValueByKey } = useForm(
    {
      t_init: 20,
      p_init: 40,
      t_final: 15,
      p_real: 0,
    },
    { storageKey: "azote" }
  )

  const { result, pressureTheorique, pressureChange, hasRealPressure } =
    useMemo(() => {
      const p_init = formValues.p_init as number
      const t_init = formValues.t_init as number
      const t_final = formValues.t_final as number
      const p_real = formValues.p_real as number

      const p_theorique = getPFinal(p_init, t_init, t_final)
      const hasReal = p_real > 0

      if (hasReal) {
        const change = Math.abs(p_real - p_theorique)
        const changePercent = (change / p_theorique) * 100
        return {
          result: `Pression théorique: ${p_theorique} bar | Pression mesurée: ${p_real} bar`,
          pressureTheorique: p_theorique,
          pressureChange: changePercent,
          hasRealPressure: true,
        }
      }

      return {
        result: `Pression théorique calculée: ${p_theorique} bar`,
        pressureTheorique: p_theorique,
        pressureChange: 0,
        hasRealPressure: false,
      }
    }, [formValues])

  const statusVariant = useMemo<"success" | "warning" | "error">(() => {
    if (pressureChange > 5) return "error"
    if (pressureChange > 2) return "warning"
    return "success"
  }, [pressureChange])

  const statusMessage = useMemo(() => {
    if (pressureChange > 5)
      return {
        variant: "error" as const,
        title: "Écart important !",
        desc: "La pression mesurée diffère de plus de 5% de la théorique. Vérifiez l'étanchéité du système.",
      }
    if (pressureChange > 2)
      return {
        variant: "warning" as const,
        title: "Écart modéré.",
        desc: "La pression diffère de 2-5% de la théorique. Surveillance recommandée.",
      }
    return {
      variant: "success" as const,
      title: "Écart normal.",
      desc: "La pression mesurée correspond bien à la théorique (écart < 2%).",
    }
  }, [pressureChange])

  const validationErrors = useMemo(() => {
    const p_init = formValues.p_init as number
    const t_init = formValues.t_init as number
    const t_final = formValues.t_final as number
    const p_real = formValues.p_real as number
    return {
      p_init: p_init <= 0 ? "La pression initiale doit être strictement positive" : undefined,
      t_init: t_init < -273 ? "Température invalide (< -273 °C)" : undefined,
      t_final: t_final < -273 ? "Température invalide (< -273 °C)" : undefined,
      p_real: p_real < 0 ? "La pression mesurée ne peut pas être négative" : undefined,
    }
  }, [formValues])

  return (
    <main className="p-4">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Gauge className="h-5 w-5 text-emerald-500" />
          Test de pression azote
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vérifiez l'étanchéité de votre système en comparant la pression
          théorique à la pression mesurée
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Paramètres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <InputCustom
                label="Pression initiale"
                value={formValues.p_init as number}
                setValue={(v) => setValueByKey("p_init", v)}
                unit="bar"
                step={0.1}
                min={0}
                error={validationErrors.p_init}
              />
              <InputCustom
                label="Température initiale"
                value={formValues.t_init as number}
                setValue={(v) => setValueByKey("t_init", v)}
                unit="°C"
                step={0.1}
                min={-273}
                error={validationErrors.t_init}
              />
              <InputCustom
                label="Température finale"
                value={formValues.t_final as number}
                setValue={(v) => setValueByKey("t_final", v)}
                unit="°C"
                step={0.1}
                min={-273}
                error={validationErrors.t_final}
              />
              <InputCustom
                label="Pression mesurée (optionnel)"
                value={formValues.p_real as number}
                setValue={(v) => setValueByKey("p_real", v)}
                unit="bar"
                step={0.1}
                min={0}
                error={validationErrors.p_real}
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 shrink-0" />
              <span>
                Saisissez la pression mesurée pour comparer avec la pression
                théorique et vérifier l'étanchéité
              </span>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card
            className={cn(
              "border-2 transition-colors",
              hasRealPressure
                ? pressureChange > 5
                  ? "border-destructive/30 bg-destructive/5"
                  : pressureChange > 2
                    ? "border-amber-500/30 bg-amber-50/20 dark:bg-amber-900/10"
                    : "border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-900/10"
                : "border-primary/30 bg-primary/5"
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Box className="h-4 w-4 text-primary" />
                  Résultat
                </CardTitle>
                {hasRealPressure && (
                  <StatusBadge
                    variant={statusVariant}
                    label={`${formatNumber(pressureChange, 1)}% d'écart`}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                <div className="w-2 h-2 rounded-full bg-primary" aria-hidden />
                <p className="text-sm font-medium tabular-nums">
                  <strong>Pression théorique calculée :</strong>{" "}
                  {formatNumber(pressureTheorique, 3)} bar
                </p>
              </div>

              {hasRealPressure && (
                <>
                  <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden />
                    <p className="text-sm font-medium tabular-nums">
                      <strong>Pression mesurée :</strong>{" "}
                      {formatNumber(formValues.p_real as number, 3)} bar
                    </p>
                  </div>

                  <div className="grid gap-3 grid-cols-3">
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Pression initiale
                      </p>
                      <p className="text-sm font-semibold tabular-nums">
                        {formatNumber(formValues.p_init as number, 3)} bar
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Pression théorique
                      </p>
                      <p className="text-sm font-semibold text-primary tabular-nums">
                        {formatNumber(pressureTheorique, 3)} bar
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">
                        Écart mesuré
                      </p>
                      <p
                        className={cn(
                          "text-sm font-semibold tabular-nums",
                          pressureChange > 5 && "text-destructive",
                          pressureChange > 2 &&
                            pressureChange <= 5 &&
                            "text-amber-500",
                          pressureChange <= 2 && "text-emerald-500"
                        )}
                      >
                        {(formValues.p_real as number) > pressureTheorique
                          ? "+"
                          : ""}
                        {formatNumber(
                          (formValues.p_real as number) - pressureTheorique,
                          1
                        )}{" "}
                        bar
                      </p>
                    </div>
                  </div>

                  <StatusMessage
                    variant={statusMessage.variant}
                    title={statusMessage.title}
                    description={statusMessage.desc}
                  />
                </>
              )}

              {!hasRealPressure && (
                <StatusMessage
                  variant="info"
                  title="Calcul théorique effectué."
                  description="Saisissez la pression mesurée pour comparer avec la théorie et vérifier l'étanchéité du système."
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
