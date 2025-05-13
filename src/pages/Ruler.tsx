import {DATA_FLUIDS} from "../data/fluid";
import useForm from "../hooks/formState";
import SelectCustom from "../components/SelectCustom";
import SelectData from "../types/selectType";
import useRuler from "../hooks/UseRuler.tsx";


export default function App() {
  const options: SelectData[] = [
    { key: "T", label: "Température (°C)" },
    { key: "P", label: "Pression absolue (bar)" },
    { key: "D", label: "Densité (kg/m3)" },
    { key: "Q", label: "Taux de vapeur (%)" },
    { key: "H", label: "Enthalpie (kj/kg)" },
  ];

  const { formValues, handleChange, setValueByKey } = useForm({
    fluid: "R134a",
    car_need: "T",
    car_1: "P",
    val_1: 10,
    car_2: "Q",
    val_2: 100,
  });

  const {inLoading, infoFluid, setInfoFluid, result, getResult, error} = useRuler()

    const handleClick = async () => {
      await getResult({
          fluid: formValues.fluid,
          car_need: formValues.car_need,
          car_1: formValues.car_1,
          val_1: formValues.val_1,
          car_2: formValues.car_2,
          val_2: formValues.val_2,
      });
    }

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
                    setValue={setInfoFluid}
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
        <button onClick={handleClick} disabled={inLoading}>
            {inLoading ? "Chargement..." : "Calculer"}
        </button>

        {(error) && <div className="text-red-500 font-bold text-xl my-4">{error}</div>}

        { result && <div className="result font-bold text-xl my-4">{result}</div>}
    </>
  );
}
