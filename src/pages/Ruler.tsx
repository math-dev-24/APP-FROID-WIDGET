import { useState } from "react";
import React from "react";
import { DATA_FLUIDS, FluidsInterface } from "../data/fluid";
import useForm from "../hooks/formState";

export default function App() {
  const options: [string, string][] = [
    ["T", "Température (°C)"],
    ["P", "Pression absolue (bar)"],
    ["D", "Densité (kg/m3)"],
    ["Q", "Taux de vapeur (%)"],
    ["H", "Enthalpie (kj/kg)"],
  ];

  const [result, setResult] = useState<string>("-");
  const [loading, setLoading] = useState<boolean>(false);
  const [infoFluid, setInfoFluid] = useState<string>("GWP:1300 - G1:A1")

  const { formValues, handleChange } = useForm({
    fluid: "R134a",
    car_need: "T",
    car_1: "P",
    val_1: 10,
    car_2: "Q",
    val_2: 100,
  });

  const fluidChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fluid: FluidsInterface = DATA_FLUIDS.filter(f => f.ref_name == e.target.value)[0];
    setInfoFluid(`GWP:${fluid.gwp} - G${fluid.group}:${fluid.classification}`)
    handleChange(e)
  }

  const fetchAPI = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams(formValues).toString();
    try {
    const response = await fetch(
        `https://mathieub.pythonanywhere.com/v2/ruler?${queryParams}`
      );
      const data = await response.json();
      setResult(`Résultat : ${data.result}`)
      setLoading(false)
    } catch (e) {
        setResult("Une erreur est survenu")
        setLoading(false)
    }
  };

  return (
    <div className="flex flex-col ruler">
      <label>
        Fluide :
        <select name="fluid" value={formValues.fluid} onChange={fluidChange}>
          {
            DATA_FLUIDS.map(f => <option value={f.ref_name}>{f.name}</option>)
          }
        </select>
      </label>

      <div className="text-center italic w-100">{infoFluid}</div>

      <label>
        <span>Je recherche :</span>
        <select
          name="car_need"
          value={formValues.car_need}
          onChange={handleChange}
        >
          {options.map((i) => (
            <option value={i[0]}>{i[1]}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Critère 1 :</span>
        <select name="car_1" value={formValues.car_1} onChange={handleChange}>
          {options.map((i) => (
            <option value={i[0]}>{i[1]}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Valeur 1 :</span>
        <input
          type="number"
          name="val_1"
          value={formValues.val_1}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Critère 2 :</span>
        <select name="car_2" value={formValues.car_2} onChange={handleChange}>
          {options.map((i) => (
            <option value={i[0]}>{i[1]}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Valeur 2 :</span>
        <input
          type="number"
          name="val_2"
          value={formValues.val_2}
          onChange={handleChange}
        />
      </label>

      <button onClick={fetchAPI} disabled={loading}>{loading ? "Chargement..." : "Calculer"}</button>

          {
            result &&
            <div className="font-bold text-xl my-4">
            { result }
          </div>
          }
    </div>
  );
}


