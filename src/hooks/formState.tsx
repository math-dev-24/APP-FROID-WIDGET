import { useState } from "react";

type FormValue = string | number;
type FormValues = { [key: string]: FormValue };

export default function useForm<T extends FormValues>(initialValues: T) {
    const [formValues, setFormValues] = useState<T>(initialValues);
  
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
        ...prevValues, [key]: value
      }))
    }
  
    return { formValues, handleChange, setFormValues, setValueByKey };
  }