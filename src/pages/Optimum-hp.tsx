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
    const queryParams = new URLSearchParams(
      Object.entries(formValues).reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, string>)
    ).toString();
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
      <>
    <div className="ruler grid grid-cols-2 gap-2">
      <div className="inputForm">
        <div>Puissance :</div>
        <input
          type="number"
          name="power"
          value={formValues.power}
          onChange={handleChange}
        />
      </div>
      <div className="inputForm">
        <div>Température saturante d'évaporation :</div>
        <input 
            type="number"
            name="t_evp"
            value={formValues.t_evp}
            onChange={handleChange}
        />
      </div>

      <div className="inputForm">
        <div>Surchauffe :</div>
        <input 
            type="number"
            name="overheat"
            value={formValues.overheat}
            onChange={handleChange}
        />
      </div>

      <div className="inputForm">
        <div>Température sortie Gaz-cooler :</div>
        <input 
            type="number"
            name="t_in_det"
            value={formValues.t_in_det}
            onChange={handleChange}
        />
      </div>

      <div className="inputForm">
        <div>Rendement effectif :</div>
        <input 
            type="number"
            name="rend_eff"
            value={formValues.rend_eff}
            onChange={handleChange}
        />
      </div>

    </div>
          <div className="flex flex-col gap-2 items-center w-full my-2">
              <button onClick={goCalc} disabled={loading}>{loading ? "Chargement..." : "Calculer"}</button>
              {result && <div className="result text-xl w-full">{result}</div>}
          </div>
      </>
  );
}
