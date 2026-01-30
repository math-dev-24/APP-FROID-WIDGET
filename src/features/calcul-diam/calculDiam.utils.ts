import type { DiamPipeInterface } from "@/features/shared/pipes.data"

/**
 * Calcule la section d'un tuyau à partir de son diamètre intérieur
 * @param diamInt Diamètre intérieur en mm
 * @returns Section en m² (m_c) et en mm² (mm_c)
 */
export function calcSection(diamInt: number): { m_c: number; mm_c: number } {
  const radiusMm = diamInt / 2
  const mm_c = Math.PI * radiusMm * radiusMm
  const m_c = mm_c / 1_000_000
  return { m_c, mm_c: Math.round(mm_c * 100) / 100 }
}

type CalculMode = "vitesse" | "debit"

export function calculateResult(
  diamData: DiamPipeInterface,
  valDiamSearch: number,
  calculMode: CalculMode
): number {
  const { m_c: sectionInMeter } = calcSection(diamData.diam_int)

  if (calculMode === "vitesse") {
    return Math.round(sectionInMeter * valDiamSearch * 36000) / 10
  } else {
    return Math.round((valDiamSearch / 3600 / sectionInMeter) * 100) / 100
  }
}
