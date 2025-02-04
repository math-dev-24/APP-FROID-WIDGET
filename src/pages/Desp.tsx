import { dataNature, dataType, ListNature, ListType } from "../types/despType";
import useForm from "../hooks/formState";
import SelectCustom from "../components/SelectCustom";
import InputCustom from "../components/InputCustom";
import { useEffect, useState } from "react";
import { get_desp } from "../functions/despCalc";

export default function Desp() {
  const [showDn, setShowDn] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const { formValues, setValueByKey } = useForm({
    nature: ListNature.GAZ,
    type: ListType.RECIPIENT,
    pressure: 46,
    volume: 10,
    diamNom: 100,
    danger: 1,
  });

  const handleChangeComponent = (newVal: string) => {
    setValueByKey("type", newVal);
    if (newVal == ListType.RECIPIENT) {
      setShowDn(false);
    } else {
      setShowDn(true);
    }
  };

  const goCalcul = () => {
    const tmp_g2 = get_desp(
      formValues.nature,
      formValues.type,
      formValues.pressure,
      formValues.volume,
      formValues.diamNom,
      2
    );
    const tmp_g1 = get_desp(
      formValues.nature,
      formValues.type,
      formValues.pressure,
      formValues.volume,
      formValues.diamNom,
      1
    );
    setResult(`Groupe 1: ${tmp_g1} - Groupe 2: ${tmp_g2}`);
  };

  useEffect(() => {
    goCalcul();
  }, [formValues]);

  return (
    <main className="ruler">
      <SelectCustom
        value={dataNature.filter((d) => d.label == formValues.nature)[0].label}
        label="Nature du fluide :"
        setValue={(newVal: string) => setValueByKey("nature", newVal)}
        options={dataNature}
      />
      <SelectCustom
        value={dataType.filter((d) => d.label == formValues.type)[0].label}
        label="Composant :"
        setValue={(newVal: string) => handleChangeComponent(newVal)}
        options={dataType}
      />
      <InputCustom
        label="Presion :"
        value={formValues.pressure}
        setValue={(newVal: number) => setValueByKey("pressure", newVal)}
      />

      {showDn ? (
        <InputCustom
          label="DN :"
          value={formValues.diamNom}
          setValue={(newVal: number) => setValueByKey("diamNom", newVal)}
        />
      ) : (
        <InputCustom
          label="Volume :"
          value={formValues.volume}
          setValue={(newVal: number) => setValueByKey("volume", newVal)}
        />
      )}

      {result && <div className="font-bold text-xl my-4">{result}</div>}
    </main>
  );
}
