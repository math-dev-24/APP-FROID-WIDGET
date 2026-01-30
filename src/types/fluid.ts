type RegulationType =
  | { affected: false }
  | { affected: true; limit_year: string; about: string }

type LinksType = {
  label: string
  url: string
}

interface BaseFluidInterface {
  name: string
  ref_name: string
  gwp: number
  odp: number
  group: 1 | 2
  critical_pres: number
  critical_temp: number
  triple_temp: number
  triple_pres: number
  can_simulate: boolean
  is_mix: boolean
  links: LinksType[]
  regulation: RegulationType
}

export interface FluidsNonFlammableInterface extends BaseFluidInterface {
  classification: "A1" | "B1"
}

export interface FluidsInflammableInterface extends BaseFluidInterface {
  classification: "A2" | "A2L" | "A3" | "B2" | "B2L" | "B3"
  lfl: { lower: number; upper: number }
  description: string
}

export type Fluid = FluidsNonFlammableInterface | FluidsInflammableInterface
export type FLUIDS = Fluid[]
