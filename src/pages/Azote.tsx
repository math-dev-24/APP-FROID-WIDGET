import { useEffect, useState } from "react";
import InputCustom from "../components/InputCustom";
import useForm from "../hooks/formState";
import get_p_final from "../functions/azoteCalc";

export default function Azote() {
    const [result, setResult] = useState<string>("");
  const { formValues, setValueByKey } = useForm({
    t_init: 20,
    p_init: 40,
    t_final: 15,
  });

  useEffect(() => {
    const p_final: number = get_p_final(
      formValues.p_init,
      formValues.t_init,
      formValues.t_final
    );
    setResult(`Pression finale: ${p_final} bar`);
  }, [formValues]);

  return (
    <main className="ruler">
      <InputCustom
        label="Pression initial :"
        value={formValues.p_init}
        setValue={(newVal: number) => setValueByKey("p_init", newVal)}
      />
      <InputCustom
        label="Température initial :"
        value={formValues.t_init}
        setValue={(newVal: number) => setValueByKey("t_init", newVal)}
      />
      <InputCustom
        label="Témpérature final (contrôle) :"
        value={formValues.t_final}
        setValue={(newVal: number) => setValueByKey("t_final", newVal)}
      />
    
      {result && <div className="result font-bold text-xl my-4">{result}</div>}
    </main>
  );
}
