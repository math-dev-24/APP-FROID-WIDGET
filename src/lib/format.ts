const defaultFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
})

const formatterCache = new Map<number, Intl.NumberFormat>()

function getFormatter(decimals: number): Intl.NumberFormat {
  let fmt = formatterCache.get(decimals)
  if (!fmt) {
    fmt = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    formatterCache.set(decimals, fmt)
  }
  return fmt
}

export function formatNumber(value: number, decimals?: number): string {
  if (decimals !== undefined) {
    return getFormatter(decimals).format(value)
  }
  return defaultFormatter.format(value)
}
