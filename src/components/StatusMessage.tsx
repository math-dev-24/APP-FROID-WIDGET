import { type LucideIcon, Info, CheckCircle2, TrendingDown, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type StatusMessageVariant = "info" | "success" | "warning" | "error"

interface StatusMessageProps {
  variant: StatusMessageVariant
  title: string
  description?: string
  className?: string
}

const variantConfig: Record<
  StatusMessageVariant,
  { icon: LucideIcon; className: string }
> = {
  info: {
    icon: Info,
    className: "border-primary/50 bg-primary/5",
  },
  success: {
    icon: CheckCircle2,
    className: "border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-900/10",
  },
  warning: {
    icon: TrendingDown,
    className: "border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/10",
  },
  error: {
    icon: AlertTriangle,
    className: "border-destructive/50 bg-destructive/10 dark:bg-destructive/10",
  },
}

export default function StatusMessage({
  variant,
  title,
  description,
  className,
}: StatusMessageProps) {
  const { icon: Icon, className: variantClassName } = variantConfig[variant]
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border",
        variantClassName,
        className
      )}
    >
      <Icon className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
      <div className="text-sm">
        <strong>{title}</strong>
        {description && <> {description}</>}
      </div>
    </div>
  )
}
