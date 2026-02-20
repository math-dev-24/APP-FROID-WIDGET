import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputCustomProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  /** Message d'erreur affiché sous le champ */
  error?: string;
  /** Nom du champ pour autocomplete (ex: "off" pour désactiver) */
  name?: string;
}

export default function InputCustom(props: InputCustomProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      props.setValue(0);
      return;
    }
    const newVal = parseFloat(raw);
    props.setValue(isNaN(newVal) ? 0 : newVal);
  };

  const inputId = props.label.replace(/\s+/g, "-").toLowerCase();
  const hasError = !!props.error;

  return (
    <div className={cn("flex flex-col gap-1 my-1")}>
      <Label htmlFor={inputId}>{props.label}</Label>
      <div className="relative">
        <Input
          id={inputId}
          name={props.name ?? inputId}
          type="number"
          inputMode="decimal"
          value={props.value}
          onChange={handleChange}
          step={props.step ?? 1}
          min={props.min}
          max={props.max}
          autoComplete="off"
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          className={cn("bg-background", props.unit && "pr-10", hasError && "border-destructive")}
        />
        {props.unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none" aria-hidden>
            {props.unit}
          </span>
        )}
      </div>
      {hasError && (
        <span id={`${inputId}-error`} role="alert" className="text-xs text-destructive">
          {props.error}
        </span>
      )}
    </div>
  );
}
