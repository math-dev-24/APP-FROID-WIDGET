import { useState } from "react";
import {DATA_FLUIDS} from "../data/fluid";
import useForm from "../hooks/formState";
import SelectCustom from "../components/SelectCustom";
import SelectData from "../types/selectType";
import { FluidsInterface } from "../types/fluidType";


export default function App() {
  const options: SelectData[] = [
    { key: "T", label: "Température (°C)" },
    { key: "P", label: "Pression absolue (bar)" },
    { key: "D", label: "Densité (kg/m3)" },
    { key: "Q", label: "Taux de vapeur (%)" },
    { key: "H", label: "Enthalpie (kj/kg)" },
  ];

  const [result, setResult] = useState<string>("-");
  const [loading, setLoading] = useState<boolean>(false);
  const [infoFluid, setInfoFluid] = useState<string>("GWP:1300 - G1:A1");

  const { formValues, handleChange, setValueByKey } = useForm({
    fluid: "R134a",
    car_need: "T",
    car_1: "P",
    val_1: 10,
    car_2: "Q",
    val_2: 100,
  });

  const fluidChange = (new_fluid: string) => {
    const fluid: FluidsInterface = DATA_FLUIDS.filter(
      (f) => f.ref_name == new_fluid
    )[0];
    setInfoFluid(`GWP:${fluid.gwp} - G${fluid.group}:${fluid.classification}`);
    setValueByKey("fluid", new_fluid);
  };

  const fetchAPI = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams(formValues).toString();
    try {
      const response = await fetch(
        `https://mathieub.pythonanywhere.com/v2/ruler?${queryParams}`
      );
      const data = await response.json();
      setResult(`Résultat : ${data.result}`);
      setLoading(false);
    } catch (e) {
      setResult("Une erreur est survenu");
      setLoading(false);
    }
  };

  const fluideLabel: SelectData[] = DATA_FLUIDS.map((f) => { return { key: f.ref_name, label: f.name }; });

  return (
    <>
        <div className="grid grid-cols-2 ruler gap-1">
            <div>
                <SelectCustom
                    value={
                        DATA_FLUIDS.filter((f) => f.ref_name == formValues.fluid)[0].name
                    }
                    label="Fluide :"
                    setValue={fluidChange}
                    options={fluideLabel}
                />
                <div className="text-center italic w-100">{infoFluid}</div>
            </div>
            <SelectCustom
                value={options.filter((o) => o.key == formValues.car_need)[0].label}
                label="Recherché :"
                setValue={(newVal: string) => setValueByKey("car_need", newVal)}
                options={options}
            />
            <SelectCustom
                value={options.filter((o) => o.key == formValues.car_1)[0].label}
                label="Critère 1 :"
                setValue={(newVal: string) => setValueByKey("car_1", newVal)}
                options={options}
            />

            <div className="inputForm">
                <div>Valeur 1 :</div>
                <input
                    type="number"
                    className="input"
                    name="val_1"
                    value={formValues.val_1}
                    onChange={handleChange}
                />
            </div>
            <SelectCustom
                value={options.filter((o) => o.key == formValues.car_2)[0].label}
                label="Critère 2 :"
                setValue={(newVal: string) => setValueByKey("car_2", newVal)}
                options={options}
            />
            <div className="inputForm">
                <div>Valeur 2 :</div>
                <input
                    type="number"
                    name="val_2"
                    className="input"
                    value={formValues.val_2}
                    onChange={handleChange}
                />
            </div>
        </div>
        <button onClick={fetchAPI} disabled={loading}>
            {loading ? "Chargement..." : "Calculer"}
        </button>

        {result && <div className="result font-bold text-xl my-4">{result}</div>}
    </>
  );
}
