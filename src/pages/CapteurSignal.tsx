import { useMemo } from "react"
import { Signal, SlidersHorizontal, ArrowLeftRight, Info } from "lucide-react"
import StatusMessage from "@/components/StatusMessage"
import InputCustom from "@/components/InputCustom"
import useForm from "@/hooks/formState"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

enum SignalType {
  SIGNAL = "signal",
  VALUE = "value",
}

interface SignalInterface {
  min: number
  max: number
  delta: number
  unit: string
}

const SIGNAL: SignalInterface[] = [
  { min: 4, max: 20, delta: 16, unit: "mA" },
  { min: 0, max: 20, delta: 20, unit: "mA" },
  { min: 0, max: 10, delta: 10, unit: "V" },
  { min: 1, max: 5, delta: 4, unit: "V" },
]

const LIST_SIGNAL: { key: string; label: string }[] = [
  { key: "0", label: "4 - 20 mA" },
  { key: "1", label: "0 - 20 mA" },
  { key: "2", label: "0 - 10 V" },
  { key: "3", label: "1 - 5 V" },
]

const LIST_UNIT: string[] = [
  "°C", "K", "Pa", "bar", "F", "A", "W", "kW",
  "V", "mV", "Hz", "kHz", "s", "ms", "min", "h",
  "d", "mo", "a", "%", "m", "mm", "cm", "km", "l/min", "m³/h",
]

function computeSignalResult(
  rechercheValue: number,
  minValue: number,
  maxValue: number,
  rechercheSignal: SignalType,
  unitValue: string,
  selectedSignal: SignalInterface
): { result: string; hasError: boolean; errorMessage: string } {
  if (
    (rechercheValue !== 0 && !rechercheValue) ||
    (minValue !== 0 && !minValue) ||
    (maxValue !== 0 && !maxValue)
  ) {
    return {
      result: "",
      hasError: true,
      errorMessage: "Veuillez remplir toutes les valeurs",
    }
  }

  if (minValue >= maxValue) {
    return {
      result: "",
      hasError: true,
      errorMessage: "La valeur minimale doit être inférieure à la valeur maximale",
    }
  }

  if (rechercheSignal === SignalType.SIGNAL) {
    if (rechercheValue < selectedSignal.min || rechercheValue > selectedSignal.max) {
      return {
        result: "",
        hasError: true,
        errorMessage: `Le signal doit être entre ${selectedSignal.min} et ${selectedSignal.max} ${selectedSignal.unit}`,
      }
    }
    const pasSignal = (maxValue - minValue) / selectedSignal.delta
    const calculValue =
      Math.round(
        (pasSignal * (rechercheValue - selectedSignal.min) + minValue) * 100
      ) / 100
    return { result: `${calculValue} ${unitValue}`, hasError: false, errorMessage: "" }
  }

  if (rechercheValue < minValue || rechercheValue > maxValue) {
    return {
      result: "",
      hasError: true,
      errorMessage: `La valeur doit être entre ${minValue} et ${maxValue} ${unitValue}`,
    }
  }
  const pasValeur = selectedSignal.delta / (maxValue - minValue)
  const calcul =
    Math.round(
      (pasValeur * (rechercheValue - minValue) + selectedSignal.min) * 100
    ) / 100
  return { result: `${calcul} ${selectedSignal.unit}`, hasError: false, errorMessage: "" }
}

export default function CapteurSignal() {
  const { formValues, setValueByKey } = useForm(
    {
      signalType: 0,
      minValue: 0,
      maxValue: 10,
      rechercheSignal: SignalType.SIGNAL,
      rechercheValue: 4,
      unitValue: "°C",
    },
    { storageKey: "capteur-signal" }
  )

  const signalType = formValues.signalType as number
  const minValue = formValues.minValue as number
  const maxValue = formValues.maxValue as number
  const rechercheSignal = formValues.rechercheSignal as SignalType
  const rechercheValue = formValues.rechercheValue as number
  const unitValue = formValues.unitValue as string

  const selectedSignal = SIGNAL[signalType]
  const maxSearch = rechercheSignal === SignalType.SIGNAL ? selectedSignal.max : maxValue
  const minSearch = rechercheSignal === SignalType.SIGNAL ? selectedSignal.min : minValue
  const unitSearch = rechercheSignal === SignalType.SIGNAL ? selectedSignal.unit : unitValue

  const { result, hasError, errorMessage } = useMemo(
    () =>
      computeSignalResult(
        rechercheValue,
        minValue,
        maxValue,
        rechercheSignal,
        unitValue,
        selectedSignal
      ),
    [
      rechercheValue,
      minValue,
      maxValue,
      rechercheSignal,
      unitValue,
      selectedSignal,
    ]
  )

  const resultDescription = result
    ? rechercheSignal === SignalType.SIGNAL
      ? `Pour un signal de ${rechercheValue} ${selectedSignal.unit}, la valeur mesurée est :`
      : `Pour une valeur de ${rechercheValue} ${unitValue}, le signal de sortie est :`
    : ""

  return (
    <main className="p-4">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Signal className="h-5 w-5 text-emerald-500" />
          Convertisseur Signal Capteur
        </h1>
      </div>

      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0 space-y-6">
          {/* Type de signal */}
          <div>
            <Label className="text-sm font-medium">Type de signal</Label>
            <Select
              value={String(signalType)}
              onValueChange={(v) => {
                setValueByKey("signalType", parseInt(v, 10))
              }}
            >
              <SelectTrigger className="mt-2 bg-background">
                <SelectValue placeholder="Sélectionnez un type de signal" />
              </SelectTrigger>
              <SelectContent>
                {LIST_SIGNAL.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              Plage du signal: {selectedSignal.min} - {selectedSignal.max}{" "}
              {selectedSignal.unit}
            </p>
          </div>

          {/* Plage du capteur */}
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
              Plage du capteur
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputCustom
                label="Valeur minimale"
                value={minValue}
                setValue={(v) => setValueByKey("minValue", v)}
                step={0.1}
                unit={unitValue}
              />
              <InputCustom
                label="Valeur maximale"
                value={maxValue}
                setValue={(v) => setValueByKey("maxValue", v)}
                min={minValue}
                step={0.1}
                unit={unitValue}
              />
            </div>

            <div className="mt-3">
              <Label className="text-sm font-medium">Unité de mesure</Label>
              <Select
                value={unitValue}
                onValueChange={(v) => setValueByKey("unitValue", v)}
              >
                <SelectTrigger className="mt-2 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LIST_UNIT.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversion */}
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <ArrowLeftRight className="h-4 w-4 text-indigo-500" />
              Conversion
            </h3>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Mode de conversion</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rechercheSignal"
                    checked={rechercheSignal === SignalType.SIGNAL}
                    onChange={() =>
                      setValueByKey("rechercheSignal", SignalType.SIGNAL)
                    }
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-sm">Signal → Valeur</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rechercheSignal"
                    checked={rechercheSignal === SignalType.VALUE}
                    onChange={() =>
                      setValueByKey("rechercheSignal", SignalType.VALUE)
                    }
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-sm">Valeur → Signal</span>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <InputCustom
                label={
                  rechercheSignal === SignalType.SIGNAL
                    ? "Valeur du signal :"
                    : "Valeur physique :"
                }
                value={rechercheValue}
                setValue={(v) => setValueByKey("rechercheValue", v)}
                min={minSearch}
                max={maxSearch}
                step={0.1}
                unit={unitSearch}
              />
            </div>
          </div>

          {/* Résultat */}
          <div>
            {hasError && (
              <StatusMessage
                variant="error"
                title={errorMessage}
              />
            )}

            {!hasError && result && (
              <div className="p-5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20">
                <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-1">
                  {resultDescription}
                </h3>
                <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                  {result}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
