import { type LucideIcon, CheckCircle2, TrendingDown, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusVariant = "success" | "warning" | "error"

interface StatusBadgeProps {
  variant: StatusVariant
  label: string
  className?: string
}

const variantConfig: Record<
  StatusVariant,
  { icon: LucideIcon; badgeVariant: "success" | "warning" | "destructive" }
> = {
  success: { icon: CheckCircle2, badgeVariant: "success" },
  warning: { icon: TrendingDown, badgeVariant: "warning" },
  error: { icon: Minus, badgeVariant: "destructive" },
}

export default function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  const { icon: Icon, badgeVariant } = variantConfig[variant]
  return (
    <Badge
      variant={badgeVariant}
      className={cn("text-sm font-semibold px-3 py-1 w-fit gap-1", className)}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </Badge>
  )
}
