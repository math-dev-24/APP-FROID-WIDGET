import {
  dataNature,
  dataType,
  dataDanger,
} from "@/features/desp/desp.constants"
import { ListNature, ListType } from "@/features/desp/desp.types"
import { getDesp } from "@/features/desp/desp.utils"
import useForm from "@/hooks/useForm"
import SelectCustom from "@/components/SelectCustom"
import InputCustom from "@/components/InputCustom"
import DespBadge from "@/components/feedback/DespBadge"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Thermometer,
  SlidersHorizontal,
  Box,
  Gauge,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DespPage() {
  const { formValues, setValueByKey } = useForm(
    {
      nature: ListNature.GAZ,
      type: ListType.RECIPIENT,
      pressure: 46,
      volume: 10,
      diamNom: 100,
      danger: "G2",
    },
    { storageKey: "desp" }
  )

  const showDn = (formValues.type as string) === ListType.TUYAUTERIE

  const { result, urlImg } = useMemo(() => {
    const tmp_group = formValues.danger === "G1" ? 1 : 2
    const tmp_type =
      formValues.type === ListType.RECIPIENT ? "recipient" : "pipe"
    const tmp_nature = formValues.nature === ListNature.GAZ ? "gaz" : "liq"

    const desp = getDesp(
      formValues.nature as ListNature,
      formValues.type as ListType,
      formValues.pressure as number,
      formValues.volume as number,
      formValues.diamNom as number,
      tmp_group
    )
    return {
      result: desp,
      urlImg: `./desp/${tmp_nature}-g${tmp_group}-${tmp_type}.png`,
    }
  }, [formValues])

  const handleChangeComponent = (newVal: string) => {
    setValueByKey("type", newVal)
  }

  return (
    <main className="p-4">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Thermometer className="h-5 w-5 text-emerald-500" />
          Classification DESP
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Déterminez la catégorie de votre équipement sous pression selon la
          directive européenne
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectCustom
                value={(formValues.nature as string) ?? ""}
                label="Nature du fluide"
                setValue={(v: string) => setValueByKey("nature", v)}
                options={dataNature}
              />
              <SelectCustom
                value={(formValues.danger as string) ?? ""}
                label="Groupe de danger"
                setValue={(v: string) => setValueByKey("danger", v)}
                options={dataDanger}
              />
              <SelectCustom
                value={(formValues.type as string) ?? ""}
                label="Type de composant"
                setValue={handleChangeComponent}
                options={dataType}
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 shrink-0" />
              <span>
                G1 : fluides peu dangereux · G2 : fluides dangereux · DN :
                diamètre nominal (mm)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Box className="h-4 w-4 text-primary" />
              Caractéristiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputCustom
                label="Pression"
                value={formValues.pressure as number}
                setValue={(v: number) => setValueByKey("pressure", v)}
                unit="bar"
                step={0.1}
                min={0}
              />
              {showDn ? (
                <InputCustom
                  label="Diamètre nominal (DN)"
                  value={formValues.diamNom as number}
                  setValue={(v: number) => setValueByKey("diamNom", v)}
                  unit="mm"
                  min={0}
                />
              ) : (
                <InputCustom
                  label="Volume"
                  value={formValues.volume as number}
                  setValue={(v: number) => setValueByKey("volume", v)}
                  unit="L"
                  step={0.1}
                  min={0}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card
            className={cn(
              "border-2 transition-colors",
              result === "Non soumis" && "border-muted",
              result === "Art 4§3" && "border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-900/10",
              (result === "Cat I" || result === "Cat II") &&
                "border-primary/30 bg-primary/5",
              (result === "Cat III" || result === "Cat IV") &&
                "border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/10"
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-primary" />
                  Classification
                </CardTitle>
                <DespBadge result={result} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden bg-muted/30 p-4 flex justify-center">
                <img
                  src={urlImg}
                  alt={result}
                  className="max-w-full h-auto max-h-[280px] object-contain rounded"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
