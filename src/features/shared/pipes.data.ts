export interface DiamPipeInterface {
  name: string
  diam_int: number
}

/**
 * Liste des diamètres de tuyauterie courants (réfrigération, CVC)
 * diam_int = diamètre intérieur en mm
 */
export const LIST_DIAM_PIPE: DiamPipeInterface[] = [
  { name: "1/4", diam_int: 4.83 },
  { name: "3/8", diam_int: 7.9 },
  { name: "1/2", diam_int: 10.9 },
  { name: "5/8", diam_int: 13.8 },
  { name: "3/4", diam_int: 16.7 },
  { name: "7/8", diam_int: 19.6 },
  { name: "1 1/8", diam_int: 25.4 },
  { name: "1 3/8", diam_int: 31.2 },
  { name: "1 5/8", diam_int: 37.0 },
  { name: "2 1/8", diam_int: 48.6 },
  { name: "2 5/8", diam_int: 60.3 },
  { name: "3 1/8", diam_int: 72.0 },
  { name: "4 1/8", diam_int: 95.3 },
  { name: "5 1/8", diam_int: 118.6 },
  { name: "6 1/8", diam_int: 141.9 },
]
