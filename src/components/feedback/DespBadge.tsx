import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type DespResult =
  | "Non soumis"
  | "Art 4§3"
  | "Cat I"
  | "Cat II"
  | "Cat III"
  | "Cat IV"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning"

function getDespBadgeVariant(result: string): BadgeVariant {
  if (result === "Non soumis") return "outline"
  if (result === "Art 4§3") return "success"
  if (result === "Cat I" || result === "Cat II") return "secondary"
  if (result === "Cat III" || result === "Cat IV") return "warning"
  return "default"
}

interface DespBadgeProps {
  result: string
  className?: string
}

export default function DespBadge({ result, className }: DespBadgeProps) {
  return (
    <Badge
      variant={getDespBadgeVariant(result)}
      className={cn("text-sm font-semibold px-3 py-1 w-fit", className)}
    >
      {result}
    </Badge>
  )
}
