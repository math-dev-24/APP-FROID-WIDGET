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
          fluid: formValues.fluid as string,
          car_need: formValues.car_need as string,
          car_1: formValues.car_1 as string,
          val_1: formValues.val_1 as number,
          car_2: formValues.car_2 as string,
          val_2: formValues.val_2 as number,
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
        <button onClick={handleClick} disabled={inLoading} className="w-1/3 m-auto my-2">
            {inLoading ? "Chargement..." : "Calculer"}
        </button>

        {/* Section Erreur */}
        {error && (
          <div className="result" style={{
            backgroundColor: '#dc2626',
            color: 'white',
            border: '1px solid #b91c1c'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <span style={{ fontWeight: '600' }}>Erreur</span>
            </div>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Section Résultat */}
        {result && (
          <div className="result">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #333'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600',
                color: '#60a5fa'
              }}>
                Résultat du calcul
              </span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '12px',
              alignItems: 'center'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%'
              }}></div>
              
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                color: '#e0e0e0',
                lineHeight: '1.5'
              }}>
                {result}
              </div>
            </div>
            
            {/* Info supplémentaire */}
            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                Calcul effectué avec succès
              </div>
            </div>
          </div>
        )}
    </>
  );
}
