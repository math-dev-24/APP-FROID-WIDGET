export type TempUnit = "Celsius" | "Kelvin" | "Fahrenheit";
export type PressUnit = "KPa" | "Bar" | "MPa" | "Pa" | "Atm" | "Psi";

export type ConfigUnit = {
  temperature_unit: TempUnit;
  pressure_unit: PressUnit;
};
