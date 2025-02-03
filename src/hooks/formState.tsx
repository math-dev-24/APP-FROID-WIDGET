import { useState } from "react";

export default function useForm(initialValues: { [key: string]: any }) {
    const [formValues, setFormValues] = useState(initialValues);
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };

    const setValueByKey = (key: string, value: string|number) => {
      setFormValues((prevValues) => ({
        ...prevValues, [key]: value
      }))
    }
  
    return { formValues, handleChange, setFormValues, setValueByKey };
  }