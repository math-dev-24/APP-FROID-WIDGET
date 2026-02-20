import { useMemo } from "react"
import {
  Cloud,
  SlidersHorizontal,
  ClipboardList,
  AlertTriangle,
  Info,
  Beaker,
} from "lucide-react"
import InputCustom from "@/components/InputCustom"
import useForm from "@/hooks/useForm"
import { formatNumber } from "@/lib/format"
import { Card, CardContent } from "@/components/ui/card"

interface AirDataState {
  psat: number
  pvap: number
  quantity_water: number
  enthalpie: number
  volume_massique: number
  temp_rose: number
  result: boolean
}

interface ResultItem {
  label: string
  value: number
  unit: string
  tooltip: string
}

interface ResultGroup {
  title: string
  icon: typeof Cloud
  items: ResultItem[]
}

function calcAirData(
  temperature: number,
  hygrometrie: number,
  pressure: number
): AirDataState {
  const psat = Math.pow(
    10,
    (7.625 * temperature) / (241 + temperature) + 2.7877
  )
  const pvap = psat * (hygrometrie / 100)
  const quantity_water = 0.622 * (pvap / (pressure - pvap))
  const enthalpie =
    1.006 * temperature +
    quantity_water * (2501 + 1.83 * temperature)
  const volume_massique =
    (461.52 * (0.622 + quantity_water) * (273.15 + temperature)) / pressure
  const temp_rose =
    -241 *
    ((Math.log10(pvap) - 2.7877) /
      (Math.log10(pvap) - 2.7577 - 7.625))

  return {
    psat,
    pvap,
    quantity_water,
    enthalpie,
    volume_massique,
    temp_rose,
    result: true,
  }
}

export default function AirDataPage() {
  const { formValues, setValueByKey } = useForm(
    {
      temperature: 20,
      hygrometrie: 50,
      pressure: 101325,
    },
    { storageKey: "air-data" }
  )

  const temperature = formValues.temperature as number
  const hygrometrie = formValues.hygrometrie as number
  const pressure = formValues.pressure as number

  const isValid =
    temperature !== undefined &&
    hygrometrie !== undefined &&
    pressure !== undefined &&
    hygrometrie >= 0 &&
    hygrometrie <= 100 &&
    pressure > 0

  const state = useMemo<AirDataState>(() => {
    if (!isValid) {
      return {
        psat: 0,
        pvap: 0,
        quantity_water: 0,
        enthalpie: 0,
        volume_massique: 0,
        temp_rose: 0,
        result: false,
      }
    }
    return calcAirData(temperature, hygrometrie, pressure)
  }, [temperature, hygrometrie, pressure, isValid])

  const resultGroups: ResultGroup[] = useMemo(
    () => [
      {
        title: "Propriétés de vapeur",
        icon: Cloud,
        items: [
          {
            label: "Pression de vapeur saturante",
            value: Math.round(state.psat),
            unit: "Pa",
            tooltip:
              "Pression maximale que peut atteindre la vapeur d'eau à cette température",
          },
          {
            label: "Pression partielle de vapeur d'eau",
            value: Math.round(state.pvap * 10) / 10,
            unit: "Pa",
            tooltip: "Pression exercée par la vapeur d'eau dans l'air",
          },
          {
            label: "Température de point de rosée",
            value: Math.round(state.temp_rose * 100) / 100,
            unit: "°C",
            tooltip:
              "Température à laquelle l'air devient saturé en vapeur d'eau (condensation)",
          },
        ],
      },
      {
        title: "Propriétés thermodynamiques",
        icon: Beaker,
        items: [
          {
            label: "Humidité spécifique",
            value: Math.round(state.quantity_water * 100000) / 100,
            unit: "geau/kgas",
            tooltip: "Masse d'eau par kilogramme d'air sec",
          },
          {
            label: "Enthalpie",
            value: Math.round(state.enthalpie * 100) / 100,
            unit: "kJ/kg",
            tooltip: "Contenu énergétique de l'air humide",
          },
          {
            label: "Volume massique",
            value: Math.round(state.volume_massique * 10000) / 10000,
            unit: "m³/kg",
            tooltip: "Volume occupé par un kilogramme d'air humide",
          },
        ],
      },
    ],
    [state]
  )

  const validationErrors = useMemo(() => {
    return {
      temperature: temperature < -273 ? "Température invalide (< -273 °C)" : undefined,
      hygrometrie:
        hygrometrie < 0 || hygrometrie > 100
          ? "L'humidité relative doit être entre 0 et 100 %"
          : undefined,
      pressure: pressure <= 0 ? "La pression doit être strictement positive" : undefined,
    }
  }, [temperature, hygrometrie, pressure])

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Cloud className="h-5 w-5 text-emerald-500" />
          Propriétés psychrométriques de l'air
        </h1>
      </div>

      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Paramètres d'entrée
            </h2>

            <div className="space-y-4">
              <InputCustom
                label="Température de l'air"
                value={temperature}
                setValue={(v) => setValueByKey("temperature", v)}
                unit="°C"
                step={0.1}
                min={-273}
                error={validationErrors.temperature}
              />
              <p className="text-xs text-muted-foreground -mt-2">
                Température de bulbe sec
              </p>

              <InputCustom
                label="Humidité relative"
                value={hygrometrie}
                setValue={(v) => setValueByKey("hygrometrie", v)}
                unit="%"
                min={0}
                max={100}
                step={1}
                error={validationErrors.hygrometrie}
              />
              <p className="text-xs text-muted-foreground -mt-2">
                Entre 0% (air sec) et 100% (air saturé)
              </p>

              <InputCustom
                label="Pression atmosphérique"
                value={pressure}
                setValue={(v) => setValueByKey("pressure", v)}
                unit="Pa"
                min={0}
                step={100}
                error={validationErrors.pressure}
              />
              <p className="text-xs text-muted-foreground -mt-2">
                Pression standard au niveau de la mer : 101325 Pa
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />
              Résultats
            </h2>

            {!state.result && (
              <div className="text-center p-8 bg-muted/50 rounded-lg">
                <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-amber-500" />
                <p className="text-muted-foreground">
                  Veuillez remplir correctement tous les champs d'entrée pour
                  obtenir des résultats.
                </p>
              </div>
            )}

            {state.result && (
              <>
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
                    Conditions actuelles
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold">
                        {temperature} °C
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Température
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {hygrometrie} %
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Humidité relative
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {pressure / 1000} kPa
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Pression
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {resultGroups.map((group, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <div className="px-3 py-2 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800">
                        <group.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <h3 className="font-medium">{group.title}</h3>
                      </div>

                      <div className="divide-y divide-border">
                        {group.items.map((item, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 flex flex-wrap justify-between items-center gap-2"
                          >
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">
                                {item.label}
                              </span>
                              <span title={item.tooltip} className="cursor-help">
                                <Info className="h-4 w-4 text-muted-foreground shrink-0" />
                              </span>
                            </div>
                            <div className="font-semibold tabular-nums">
                              {formatNumber(item.value)}{" "}
                              <span className="text-muted-foreground text-sm font-normal">
                                {item.unit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
