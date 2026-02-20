type RegulationType =
  | { affected: false }
  | { affected: true; limit_year: string; about: string }

type LinksType = {
  label: string
  url: string
}

export interface Fluid {
  name: string
  ref_name: string
  gwp: number
  odp: number
  group: 1 | 2
  classification: string
  critical_pres: number
  critical_temp: number
  triple_temp: number
  triple_pres: number
  can_simulate: boolean
  lfl?: { lower: number; upper: number } | null
  description?: string | null
  links: LinksType[]
  is_mix?: boolean
  regulation?: RegulationType
}

export type FLUIDS = Fluid[]
