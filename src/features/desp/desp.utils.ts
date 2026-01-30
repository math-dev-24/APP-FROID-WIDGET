import { ListNature, ListType } from "./desp.types"

export function getDesp(
  nature: ListNature,
  type: ListType,
  pressure: number,
  volume: number,
  diamNom: number,
  danger: number
): string {
  let result = ""
  const pvs = pressure * volume
  const pvn = pressure * diamNom
  const ART_4_3 = "Art 4§3"
  const CAT_I = "Cat I"
  const CAT_II = "Cat II"
  const CAT_III = "Cat III"
  const CAT_IV = "Cat IV"

  if (pressure < 0.5) {
    result = "Non soumis"
  } else {
    if (danger === 1) {
      if (nature === ListNature.LIQUIDE) {
        if (type === ListType.TUYAUTERIE) {
          if (diamNom < 25) result = ART_4_3
          if (pvn < 2000 && diamNom >= 25) result = ART_4_3
          if (pvn >= 2000 && pressure < 10) result = CAT_I
          if (pvn >= 2000 && diamNom >= 25 && pressure < 500 && pressure >= 10)
            result = CAT_II
          if (diamNom >= 25 && pressure >= 500) result = CAT_III
        } else {
          if (volume < 1 && pressure < 500) result = ART_4_3
          if (volume >= 1 && pvs < 200) result = ART_4_3
          if (pvs >= 200 && pressure < 10) result = CAT_I
          if (pvs >= 200 && volume >= 1 && pressure < 500 && pressure >= 10)
            result = CAT_II
          if (volume < 1 && pressure >= 500) result = CAT_II
          if (volume >= 1 && pressure >= 500) result = CAT_III
        }
      } else {
        if (type === ListType.TUYAUTERIE) {
          if (diamNom < 25) result = ART_4_3
          if (pressure >= 10 && pvn < 1000 && diamNom >= 25) result = CAT_I
          if (diamNom < 100 && diamNom >= 25 && pressure <= 10) result = CAT_I
          if (pressure > 40 && diamNom >= 25 && diamNom < 100) result = CAT_II
          if (pressure < 35 && pressure >= 10 && pvn < 3500 && pvn >= 1000)
            result = CAT_II
          if (pressure >= 35 && pressure < 40 && diamNom < 100 && pvn >= 1000)
            result = CAT_II
          if (pressure <= 10 && diamNom >= 100 && diamNom < 350) result = CAT_II
          if (pressure > 35 && diamNom >= 100) result = CAT_III
          if (pressure <= 10 && diamNom >= 350) result = CAT_III
          if (pressure > 10 && pressure <= 35 && pvn >= 3500) result = CAT_III
        } else {
          if (pressure < 200 && volume < 1) result = ART_4_3
          if (volume >= 1 && pvs < 25) result = ART_4_3
          if (pvs >= 25 && pvs < 50 && volume >= 1) result = CAT_I
          if (pvs >= 50 && pvs < 200 && volume >= 1) result = CAT_II
          if (pressure >= 200 && volume < 1000 && volume < 1) result = CAT_III
          if (volume >= 1 && pvs >= 200 && pvs < 1000) result = CAT_III
          if (volume < 1 && pressure >= 1000) result = CAT_IV
          if (volume >= 1 && pvs >= 1000) result = CAT_IV
        }
      }
    } else {
      if (nature === ListNature.LIQUIDE) {
        if (type === ListType.TUYAUTERIE) {
          if (diamNom <= 200) result = ART_4_3
          if (diamNom <= 500 && diamNom > 200 && pvn <= 5000) result = ART_4_3
          if (diamNom > 500 && pressure <= 10) result = ART_4_3
          if (diamNom > 200 && pvn > 5000 && diamNom <= 500 && pressure <= 500)
            result = CAT_I
          if (diamNom > 500 && pressure > 10 && pressure <= 500) result = CAT_I
          if (diamNom > 200 && pressure > 500) result = CAT_II
        } else {
          if (volume < 10 && pressure < 1000) result = ART_4_3
          if (volume >= 10 && pvs < 10000 && volume < 1000) result = ART_4_3
          if (volume >= 1000 && pressure < 10) result = ART_4_3
          if (pvs >= 10000 && pressure < 500 && volume < 1000) result = CAT_I
          if (pressure >= 10 && pressure < 500 && volume >= 1000) result = CAT_I
          if (pressure >= 1000 && volume < 10) result = CAT_I
          if (pvs >= 10000 && pressure >= 500 && volume >= 10) result = CAT_II
        }
      } else {
        if (type === ListType.TUYAUTERIE) {
          if (diamNom < 32) result = ART_4_3
          if (diamNom >= 32 && pvn < 1000) result = ART_4_3
          if (diamNom >= 32 && pressure >= 35 && diamNom < 100) result = CAT_I
          if (pressure < 35 && pressure >= 31.25 && pvn < 3500 && diamNom >= 32)
            result = CAT_I
          if (pressure < 31.25 && pvn >= 1000 && pvn < 3500) result = CAT_I
          if (pressure >= 35 && diamNom >= 100 && diamNom < 250) result = CAT_II
          if (pressure > 20 && pressure <= 35 && diamNom < 250 && pvn >= 3500)
            result = CAT_II
          if (pressure <= 20 && pvn < 5000 && pvn >= 3500) result = CAT_II
          if (pressure > 20 && diamNom >= 250) result = CAT_III
          if (pressure <= 20 && pvn >= 5000) result = CAT_III
        } else {
          if (pressure < 1000 && volume < 1) result = ART_4_3
          if (volume >= 1 && pvs < 50) result = ART_4_3
          if (pvs >= 50 && pvs < 200 && volume >= 1) result = CAT_I
          if (pvs >= 200 && pvs < 1000 && volume >= 1) result = CAT_II
          if (pressure >= 1000 && pressure < 3000 && volume <= 1) result = CAT_III
          if (volume > 1 && volume <= 1000 && pvs >= 1000 && pvs < 3000)
            result = CAT_III
          if (volume >= 1000 && pressure < 4 && pvs >= 1000) result = CAT_III
          if (volume <= 1 && pressure >= 3000) result = CAT_IV
          if (volume >= 1 && volume <= 1000 && pvs >= 3000) result = CAT_IV
          if (volume >= 1000 && pressure >= 4) result = CAT_IV
        }
      }
    }
  }
  return result
}
