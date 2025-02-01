import { useState } from "react";
import useForm from "../hooks/formState";

export default function Optimum() {
  const [result, setResult] = useState<string>("-");
  const [loading, setLoading] = useState<boolean>(false);

  const { formValues, handleChange } = useForm({
    power: 10,
    t_evp: -10,
    overheat: 5,
    rend_eff: 1,
    t_in_det: 28,
  });

  const goCalc = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams(formValues).toString();
    try {
      const response = await fetch(
        `https://mathieub.pythonanywhere.com/v2/hp-optimum?${queryParams}`
      );
      const data = await response.json();
      setResult(`Pression : ${data.pressure} - EER: ${data.eer} - Pcpr: ${data.cpr} - qm: ${data.qm_h}kg/h`);
      setLoading(false);
    } catch (e) {
      setResult("Une erreur est survenu");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col ruler">
      <label>
        <span>Puissance :</span>
        <input
          type="number"
          name="power"
          value={formValues.power}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Température saturante d'évaporation :</span>
        <input 
            type="number"
            name="t_evp"
            value={formValues.t_evp}
            onChange={handleChange}
        />
      </label>

      <label>
        <span>Surchauffe :</span>
        <input 
            type="number"
            name="overheat"
            value={formValues.overheat}
            onChange={handleChange}
        />
      </label>

      <label>
        <span>Température sortie Gaz-cooler :</span>
        <input 
            type="number"
            name="t_in_det"
            value={formValues.t_in_det}
            onChange={handleChange}
        />
      </label>

      <label>
        <span>Rendement effectif :</span>
        <input 
            type="number"
            name="rend_eff"
            value={formValues.rend_eff}
            onChange={handleChange}
        />
      </label>
      <button onClick={goCalc} disabled={loading}>{loading ? "Chargement..." : "Calculer"}</button>
      {result && <div className="text-xl font-bold my-4">{result}</div>}
    </div>
  );
}
