import type { SelectData } from "@/types/select"
import { ListNature, ListType } from "./desp.types"

export const dataType: SelectData[] = [
  { key: ListType.TUYAUTERIE, label: "Tuyauterie" },
  { key: ListType.RECIPIENT, label: "Récipient" },
]

export const dataNature: SelectData[] = [
  { key: ListNature.GAZ, label: "Gaz" },
  { key: ListNature.LIQUIDE, label: "Liquide" },
]

export const dataDanger: SelectData[] = [
  { key: "G1", label: "G1" },
  { key: "G2", label: "G2" },
]
