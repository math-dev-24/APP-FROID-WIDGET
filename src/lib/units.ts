import type { ConfigUnit, TempUnit, PressUnit } from "@/types/settings";

const TEMP_SYMBOLS: Record<TempUnit, string> = {
  Celsius: "°C",
  Kelvin: "K",
  Fahrenheit: "°F",
};

const PRESS_SYMBOLS: Record<PressUnit, string> = {
  Pa: "Pa",
  KPa: "kPa",
  Bar: "bar",
  MPa: "MPa",
  Atm: "atm",
  Psi: "PSI",
};

const FIXED_UNITS: Record<string, string> = {
  D: "kg/m³",
  H: "kJ/kg",
  S: "kJ/(kg·K)",
  Q: "%",
};

export function getUnitSymbol(property: string, config: ConfigUnit): string {
  if (property === "T") return TEMP_SYMBOLS[config.temperature_unit];
  if (property === "P") return PRESS_SYMBOLS[config.pressure_unit];
  return FIXED_UNITS[property] ?? "";
}

export function getPropertyLabel(property: string, config: ConfigUnit): string {
  const labels: Record<string, string> = {
    P: "Pression",
    T: "Température",
    D: "Densité",
    H: "Enthalpie",
    S: "Entropie",
    Q: "Titre",
  };
  const label = labels[property] ?? property;
  const unit = getUnitSymbol(property, config);
  return unit ? `${label} (${unit})` : label;
}

// ── Conversions température (référence interne : °C) ─────────────────

export function tempToCelsius(value: number, unit: TempUnit): number {
  switch (unit) {
    case "Celsius": return value;
    case "Kelvin": return value - 273.15;
    case "Fahrenheit": return (value - 32) * 5 / 9;
  }
}

export function celsiusToTemp(celsius: number, unit: TempUnit): number {
  switch (unit) {
    case "Celsius": return celsius;
    case "Kelvin": return celsius + 273.15;
    case "Fahrenheit": return celsius * 9 / 5 + 32;
  }
}

// ── Conversions pression (référence interne : Pa) ────────────────────

const PA_FACTORS: Record<PressUnit, number> = {
  Pa: 1,
  KPa: 1_000,
  Bar: 100_000,
  MPa: 1_000_000,
  Atm: 101_325,
  Psi: 6_894.757,
};

export function pressToPascal(value: number, unit: PressUnit): number {
  return value * PA_FACTORS[unit];
}

export function pascalToPress(pascal: number, unit: PressUnit): number {
  return pascal / PA_FACTORS[unit];
}
