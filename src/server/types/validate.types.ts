export type ValidateObj = {
  [key: string]: "string" | "number" | "boolean"
}

export type ValidateArr = string[]

type PossibleValue = string | number | boolean

// type PossibleData = {
//   [key: string]: PossibleValue | PossibleData
// }

export type PayloadData = {
  [key: string]: PossibleValue | PossibleValue[] | PayloadData | PayloadData[]
}
// type TempData = {
//   [key: string]: string | number | boolean | null | TempData;
// };
