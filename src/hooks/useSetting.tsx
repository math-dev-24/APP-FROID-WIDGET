import { useState, useEffect, useCallback } from "react";
import type { TempUnit, PressUnit, ConfigUnit } from "@/types/settings";

export type { TempUnit, PressUnit, ConfigUnit };

const STORAGE_KEY = "app-froid-settings";

const DEFAULT_CONFIG: ConfigUnit = {
  temperature_unit: "Celsius",
  pressure_unit: "Bar",
};

function loadConfig(): ConfigUnit {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<ConfigUnit>;
    return {
      temperature_unit: parsed.temperature_unit ?? DEFAULT_CONFIG.temperature_unit,
      pressure_unit: parsed.pressure_unit ?? DEFAULT_CONFIG.pressure_unit,
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export default function useSetting() {
  const [config, setConfig] = useState<ConfigUnit>(loadConfig);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // localStorage indisponible ou quota dépassé
    }
  }, [config]);

  const setTempUnit = useCallback((unit: TempUnit) => {
    setConfig((prev) => ({ ...prev, temperature_unit: unit }));
  }, []);

  const setPressUnit = useCallback((unit: PressUnit) => {
    setConfig((prev) => ({ ...prev, pressure_unit: unit }));
  }, []);

  return { config, setTempUnit, setPressUnit };
}
