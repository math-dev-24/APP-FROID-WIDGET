import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { SelectData } from "@/types/select"

interface SelectProp {
  label: string
  value: string
  setValue: (value: string) => void
  options: SelectData[]
}

export default function SelectCustom({
  label,
  value,
  setValue,
  options,
}: SelectProp) {
  const selectId = label.replace(/\s+/g, "-").toLowerCase()
  return (
    <div className="flex flex-col gap-1 my-1 w-full">
      <Label htmlFor={selectId}>{label}</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id={selectId} className="bg-background" aria-label={label}>
          <SelectValue placeholder="Sélectionner…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.key} value={o.key}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
