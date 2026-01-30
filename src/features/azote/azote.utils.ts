/** Loi des gaz parfaits : P_final = P_init × (T_final + 273.15) / (T_init + 273.15) */
export function getPFinal(
  pInit: number,
  tInit: number,
  tFinal: number
): number {
  const p = Number(pInit)
  const t1 = Number(tInit) + 273.15
  const t2 = Number(tFinal) + 273.15
  return Math.round((p * t2) / t1 * 1000) / 1000
}
