import { Settings, Thermometer, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SelectCustom from "@/components/SelectCustom"
import useSetting, { type TempUnit, type PressUnit } from "@/hooks/useSetting"
import type { SelectData } from "@/types/select"

const tempOptions: SelectData[] = [
  { key: "Celsius", label: "Celsius (°C)" },
  { key: "Kelvin", label: "Kelvin (K)" },
  { key: "Fahrenheit", label: "Fahrenheit (°F)" },
]

const pressOptions: SelectData[] = [
  { key: "Pa", label: "Pascal (Pa)" },
  { key: "KPa", label: "Kilopascal (kPa)" },
  { key: "Bar", label: "Bar" },
  { key: "MPa", label: "Mégapascal (MPa)" },
  { key: "Atm", label: "Atmosphère (atm)" },
  { key: "Psi", label: "PSI" },
]

export default function SettingsPage() {
  const { config, setTempUnit, setPressUnit } = useSetting()

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Settings className="h-5 w-5 text-primary" />
          Réglages
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configurez les unités utilisées dans les calculs
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              Unité de température
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SelectCustom
              value={config.temperature_unit}
              label="Température"
              setValue={(v: string) => setTempUnit(v as TempUnit)}
              options={tempOptions}
            />
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              Unité de pression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SelectCustom
              value={config.pressure_unit}
              label="Pression"
              setValue={(v: string) => setPressUnit(v as PressUnit)}
              options={pressOptions}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
