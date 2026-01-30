import { useState, useEffect } from "react";

type FormValue = string | number;
type FormValues = { [key: string]: FormValue };

const STORAGE_PREFIX = "app-froid-form-";

function loadFromStorage<T extends FormValues>(key: string): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as T;
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

function saveToStorage<T extends FormValues>(key: string, values: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(values));
  } catch {
    // QuotaExceeded ou localStorage désactivé
  }
}

export default function useForm<T extends FormValues>(
  initialValues: T,
  options?: { storageKey?: string }
) {
  const [formValues, setFormValues] = useState<T>(() => {
    if (options?.storageKey) {
      const stored = loadFromStorage<T>(options.storageKey);
      if (stored) return stored;
    }
    return initialValues;
  });

  useEffect(() => {
    if (options?.storageKey) {
      saveToStorage(options.storageKey, formValues);
    }
  }, [formValues, options?.storageKey]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const setValueByKey = (key: keyof T, value: FormValue) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return { formValues, handleChange, setFormValues, setValueByKey };
}