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
  
    return { formValues, handleChange, setFormValues };
  }