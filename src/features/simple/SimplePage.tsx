import { useState, useMemo, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import SelectCustom from "@/components/SelectCustom"
import InputCustom from "@/components/InputCustom"
import { useFluids } from "@/hooks/useFluids"
import { useSimple } from "./useSimple"
import useSetting from "@/hooks/useSetting"
import { getUnitSymbol } from "@/lib/units"
import type { SelectData } from "@/types/select"
import type { StateType, SatMode, DebitMode, SimpleApiInput, SimpleApiOutput } from "@/types/simple"

const stateOptions: SelectData[] = [
  { key: "Liquide", label: "Liquide" },
  { key: "Gaz", label: "Gaz" },
  { key: "Trans-critique", label: "Trans-crit." },
]

const satModeOptions: SelectData[] = [
  { key: "1", label: "Pression sat." },
  { key: "2", label: "Temp. sat." },
]

const debitModeOptions: SelectData[] = [
  { key: "1", label: "Massique" },
  { key: "2", label: "Volumique" },
]

export default function SimplePage() {
  const { fluids, loading: fluidsLoading, error: fluidsError } = useFluids()
  const { send } = useSimple()
  const { config } = useSetting()

  const [fluid, setFluid] = useState("")
  const [state, setState] = useState<StateType>("Liquide")
  const [satMode, setSatMode] = useState<SatMode>(2)
  const [debitMode, setDebitMode] = useState<DebitMode>(1)
  const [sat, setSat] = useState(38)
  const [debit, setDebit] = useState(1)
  const [tProductC, setTProductC] = useState(35)

  const [result, setResult] = useState<SimpleApiOutput | null>(null)
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

  const satUnit = satMode === 1 ? getUnitSymbol("P", config) : getUnitSymbol("T", config)
  const debitUnit = debitMode === 1 ? "kg/s" : "m³/h"
  const canSubmit = fluid && debit > 0

  const handleSatModeChange = (v: string) => {
    const mode = Number(v) as SatMode
    if (state === "Trans-critique" && mode === 2) return
    setSatMode(mode)
  }

  const handleStateChange = (v: string) => {
    setState(v as StateType)
    if (v === "Trans-critique" && satMode === 2) setSatMode(1)
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSending(true)
    setSendError(null)
    setResult(null)

    const data: SimpleApiInput = {
      fluid,
      state,
      debit,
      sat,
      t_product_c: tProductC,
      debit_mode: debitMode,
      sat_mode: satMode,
    }

    try {
      const res = await send(config, data)
      setResult(res)
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
      <h1 className="text-base font-semibold">Calcul simple</h1>

      <div className="grid grid-cols-2 gap-2">
        <SelectCustom value={fluid} label="Fluide" setValue={setFluid} options={fluidOptions} />
        <SelectCustom value={state} label="État" setValue={handleStateChange} options={stateOptions} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <SelectCustom
          value={String(satMode)}
          label="Mode sat."
          setValue={handleSatModeChange}
          options={state === "Trans-critique" ? satModeOptions.filter((o) => o.key === "1") : satModeOptions}
        />
        <InputCustom
          label={satMode === 1 ? "P sat." : "T sat."}
          value={sat}
          setValue={setSat}
          step={0.1}
          unit={satUnit}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <SelectCustom
          value={String(debitMode)}
          label="Mode débit"
          setValue={(v) => setDebitMode(Number(v) as DebitMode)}
          options={debitModeOptions}
        />
        <InputCustom label="Débit" value={debit} setValue={setDebit} step={0.01} min={0} unit={debitUnit} />
      </div>

      <InputCustom label="T° production" value={tProductC} setValue={setTProductC} step={0.1} unit={getUnitSymbol("T", config)} />

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

      {result && (
        <div className="rounded-lg border border-border bg-muted/20 p-2">
          <div className="grid grid-cols-2 gap-1.5">
            <ResultCell label="P sat." value={result.p_sat} unit={getUnitSymbol("P", config)} />
            <ResultCell label="T° sat. liq." value={result.t_sat_liq} unit={getUnitSymbol("T", config)} />
            <ResultCell label="T° sat. vap." value={result.t_sat_vap} unit={getUnitSymbol("T", config)} />
            <ResultCell label="T° prod." value={result.t_product} unit={getUnitSymbol("T", config)} />
            <ResultCell label="Viscosité" value={result.viscosity} unit="Pa·s" />
            <ResultCell label="Densité" value={result.density} unit="kg/m³" />
            <ResultCell label="Enthalpie" value={result.h_tmp} unit="kJ/kg" />
            <ResultCell label="Q vol." value={result.q_vol_h} unit="m³/h" />
          </div>
        </div>
      )}
    </div>
  )
}

function ResultCell({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="px-2 py-1">
      <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
      <p className="text-xs font-semibold tabular-nums">
        {value} <span className="font-normal text-muted-foreground">{unit}</span>
      </p>
    </div>
  )
}
