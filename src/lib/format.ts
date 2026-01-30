/**
 * Formate un nombre avec Intl.NumberFormat pour la locale française.
 * Utilise tabular-nums pour un alignement cohérent des colonnes.
 */
const numberFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
})

export function formatNumber(value: number, decimals?: number): string {
  if (decimals !== undefined) {
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }
  return numberFormatter.format(value)
}
