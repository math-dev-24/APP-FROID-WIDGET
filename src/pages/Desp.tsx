import { dataNature, dataType, ListNature, ListType, dataDanger } from "../types/despType";
import useForm from "../hooks/formState";
import SelectCustom from "../components/SelectCustom";
import InputCustom from "../components/InputCustom";
import { useEffect, useState, useCallback } from "react";
import { get_desp } from "../functions/despCalc";

export default function Desp() {
  const [showDn, setShowDn] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [urlImg, setUrlImg] = useState<string>("");


  const { formValues, setValueByKey } = useForm({
    nature: ListNature.GAZ,
    type: ListType.RECIPIENT,
    pressure: 46,
    volume: 10,
    diamNom: 100,
    danger: "G2"
  });

  const handleChangeComponent = (newVal: string) => {
    setValueByKey("type", newVal);
    if (newVal == ListType.RECIPIENT) {
      setShowDn(false);
    } else {
      setShowDn(true);
    }
  };

  const goCalcul = useCallback(() => {
    const tmp_group = formValues.danger == "G1" ? 1 : 2;
    const tmp_type = formValues.type == ListType.RECIPIENT ? "recipient" : "pipe";
    const tmp_nature = formValues.nature == ListNature.GAZ ? "gaz" : "liq";

    const desp = get_desp(
      formValues.nature as ListNature,
      formValues.type as ListType,
      formValues.pressure as number,
      formValues.volume as number,
      formValues.diamNom as number,
      tmp_group
    );
    setUrlImg(`./desp/${tmp_nature}-g${tmp_group}-${tmp_type}.png`);
    setResult(desp);
  }, [formValues]);

  useEffect(() => {
    goCalcul();
  }, [formValues, goCalcul]);

  return (
    <main className="ruler grid grid-cols-2 gap-2">
      <SelectCustom
        value={dataNature.filter((d) => d.label == formValues.nature)[0].label}
        label="Nature du fluide :"
        setValue={(newVal: string) => setValueByKey("nature", newVal)}
        options={dataNature}
      />
      <SelectCustom
        value={formValues.danger as string}
        label="Groupe :"
        setValue={(newVal: string) => setValueByKey("danger", newVal)}
        options={dataDanger}
      />
      <SelectCustom
        value={dataType.filter((d) => d.label == formValues.type)[0].label}
        label="Composant :"
        setValue={(newVal: string) => handleChangeComponent(newVal)}
        options={dataType}
      />
      <InputCustom
        label="Presion :"
        value={formValues.pressure as number}
        setValue={(newVal: number) => setValueByKey("pressure", newVal)}
      />

      {showDn ? (
        <InputCustom
          label="DN :"
          value={formValues.diamNom as number}
          setValue={(newVal: number) => setValueByKey("diamNom", newVal)}
        />
      ) : (
        <InputCustom
          label="Volume :"
          value={formValues.volume as number}
          setValue={(newVal: number) => setValueByKey("volume", newVal)}
        />
      )}
      <div className="result col-span-2">
        {result && <div className="font-bold text-xl my-4 text-center">{result}</div>}
        {result && <img src={urlImg} alt={urlImg} />}
      </div>

    </main>
  );
}
