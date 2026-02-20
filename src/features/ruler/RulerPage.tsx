import { useState, useMemo, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import SelectCustom from "@/components/SelectCustom"
import InputCustom from "@/components/InputCustom"
import { useFluids } from "@/hooks/useFluids"
import { useRuler } from "./useRuler"
import useSetting from "@/hooks/useSetting"
import type { SelectData } from "@/types/select"
import type { DataIntRuler } from "@/types/ruler"
import { getUnitSymbol, getPropertyLabel } from "@/lib/units"
import { formatNumber } from "@/lib/format"

const propertyOptions: SelectData[] = [
  { key: "P", label: "Pression (P)" },
  { key: "T", label: "Température (T)" },
  { key: "D", label: "Densité (D)" },
  { key: "H", label: "Enthalpie (H)" },
  { key: "S", label: "Entropie (S)" },
  { key: "Q", label: "Titre (Q)" },
]

export default function RulerPage() {
  const { fluids, loading: fluidsLoading, error: fluidsError } = useFluids()
  const { send } = useRuler()
  const { config } = useSetting()

  const [fluid, setFluid] = useState("")
  const [need, setNeed] = useState("P")
  const [car1, setCar1] = useState("T")
  const [car2, setCar2] = useState("Q")
  const [value1, setValue1] = useState(20)
  const [value2, setValue2] = useState(100)

  const [result, setResult] = useState<number | null>(null)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const fluidOptions: SelectData[] = useMemo(
    () =>
      fluids
        .filter((f) => f.can_simulate)
        .map((f) => ({ key: f.ref_name, label: f.name })),
    [fluids]
  )

  useEffect(() => {
    if (fluidOptions.length > 0 && !fluid) {
      setFluid(fluidOptions[0].key)
    }
  }, [fluidOptions, fluid])

  const canSubmit = fluid && need && car1 && car2 && car1 !== car2

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSending(true)
    setSendError(null)
    setResult(null)

    const data: DataIntRuler = {
      fluid,
      need,
      car_1: car1,
      car_2: car2,
      value_1: value1,
      value_2: value2,
    }

    try {
      const res = await send(config, data)
      setResult((res as { result: number }).result)
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setSending(false)
    }
  }

  if (fluidsLoading) {
    return (
      <div className="p-3 flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        Chargement…
      </div>
    )
  }

  if (fluidsError) {
    return (
      <div className="p-3">
        <p className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {fluidsError}
        </p>
      </div>
    )
  }

  return (
    <div className="p-3 space-y-3">
      <h1 className="text-base font-semibold">Règle frigorifique</h1>

      <div className="grid grid-cols-2 gap-2">
        <SelectCustom value={fluid} label="Fluide" setValue={setFluid} options={fluidOptions} />
        <SelectCustom
          value={need}
          label="Rechercher"
          setValue={setNeed}
          options={propertyOptions.filter((o) => o.key !== car1 && o.key !== car2)}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <SelectCustom
            value={car1}
            label="Car. 1"
            setValue={(v) => { setCar1(v); if (v === car2) setCar2(""); }}
            options={propertyOptions.filter((o) => o.key !== need && o.key !== car2)}
          />
          <InputCustom label="Valeur" value={value1} setValue={setValue1} step={0.1} unit={car1 ? getUnitSymbol(car1, config) : undefined} />
        </div>
        <div>
          <SelectCustom
            value={car2}
            label="Car. 2"
            setValue={setCar2}
            options={propertyOptions.filter((o) => o.key !== need && o.key !== car1)}
          />
          <InputCustom label="Valeur" value={value2} setValue={setValue2} step={0.1} unit={car2 ? getUnitSymbol(car2, config) : undefined} />
        </div>
      </div>

      <Button className="w-full" disabled={!canSubmit || sending} onClick={handleSubmit}>
        {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {sending ? "Calcul…" : "Calculer"}
      </Button>

      {sendError && (
        <p className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {sendError}
        </p>
      )}

      {result != null && (
        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-3 text-center">
          <p className="text-xs text-muted-foreground">{getPropertyLabel(need, config)}</p>
          <p className="text-2xl font-bold tabular-nums mt-0.5">
            {formatNumber(result, 2)} <span className="text-sm font-normal text-muted-foreground">{getUnitSymbol(need, config)}</span>
          </p>
        </div>
      )}
    </div>
  )
}
