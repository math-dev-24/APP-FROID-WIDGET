import { useEffect, useState } from "react";
import InputCustom from "../components/InputCustom";
import useForm from "../hooks/formState";
import get_p_final from "../functions/azoteCalc";

export default function Azote() {
  const [result, setResult] = useState<string>("");
  const [pressureTheorique, setPressureTheorique] = useState<number>(0);
  const [pressureChange, setPressureChange] = useState<number>(0);
  const [hasRealPressure, setHasRealPressure] = useState<boolean>(false);
  
  const { formValues, setValueByKey } = useForm({
    t_init: 20,
    p_init: 40,
    t_final: 15,
    p_real: 0,
  });

  useEffect(() => {
    // Calcul de la pression théorique
    const p_theorique: number = get_p_final(
      formValues.p_init as number,
      formValues.t_init as number,
      formValues.t_final as number
    );
    setPressureTheorique(p_theorique);
    
    // Si l'utilisateur a saisi une pression réelle
    if (formValues.p_real && (formValues.p_real as number) > 0) {
      const change = Math.abs((formValues.p_real as number) - p_theorique);
      const changePercent = ((change / p_theorique) * 100);
      
      setPressureChange(changePercent);
      setHasRealPressure(true);
      setResult(`Pression théorique: ${p_theorique} bar | Pression mesurée: ${formValues.p_real} bar`);
    } else {
      setHasRealPressure(false);
      setResult(`Pression théorique calculée: ${p_theorique} bar`);
    }
  }, [formValues]);

  return (
    <main className="ruler grid-cols-2 grid gap-2">
      <InputCustom
        label="Pression initial :"
        value={formValues.p_init as number}
        setValue={(newVal: number) => setValueByKey("p_init", newVal)}
      />
      <InputCustom
        label="Température initial :"
        value={formValues.t_init as number}
        setValue={(newVal: number) => setValueByKey("t_init", newVal)}
      />
      <InputCustom
        label="Témpérature final :"
        value={formValues.t_final as number}
        setValue={(newVal: number) => setValueByKey("t_final", newVal)}
      />
      <InputCustom
        label="Pression mesurée (optionnel) :"
        value={formValues.p_real as number}
        setValue={(newVal: number) => setValueByKey("p_real", newVal)}
      />
    
      {/* Section Résultat */}
      {result && (
        <div className="result col-span-2">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid #333'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18"/>
              <path d="M7 12l3-3 3 3 5-5"/>
            </svg>
            <span style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#60a5fa'
            }}>
              Test de pression azote
            </span>
          </div>
          
          {/* Pression théorique (toujours affichée) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#60a5fa',
              borderRadius: '50%'
            }}></div>
            
            <div style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#e0e0e0'
            }}>
              <strong>Pression théorique calculée:</strong> {pressureTheorique} bar
            </div>
          </div>

          {/* Pression mesurée et comparaison (si saisie) */}
          {hasRealPressure && (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%'
                }}></div>
                
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#e0e0e0'
                }}>
                  <strong>Pression mesurée:</strong> {formValues.p_real} bar
                </div>

                {/* Badge de variation */}
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: pressureChange > 5 ? '#dc2626' : pressureChange > 2 ? '#f59e0b' : '#10b981',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {pressureChange > 5 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v6m0 0l-3-3m3 3l3-3"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  ) : pressureChange > 2 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v8m-4-4h8"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {pressureChange.toFixed(1)}%
                </div>
              </div>
            </>
          )}

          {/* Indicateurs détaillés */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: hasRealPressure ? '1fr 1fr 1fr' : '1fr 1fr',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
                Pression initiale
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '600', color: '#e0e0e0' }}>
                {formValues.p_init} bar
              </div>
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: '#1a1a1a',
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
                Pression théorique
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '600', color: '#60a5fa' }}>
                {pressureTheorique} bar
              </div>
            </div>

            {hasRealPressure && (
              <div style={{
                padding: '12px',
                backgroundColor: '#1a1a1a',
                borderRadius: '6px',
                border: '1px solid #333'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>
                  Écart mesuré
                </div>
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: pressureChange > 5 ? '#dc2626' : pressureChange > 2 ? '#f59e0b' : '#10b981'
                }}>
                  {(formValues.p_real as number) > pressureTheorique ? '+' : ''}{((formValues.p_real as number) - pressureTheorique).toFixed(1)} bar
                </div>
              </div>
            )}
          </div>

          {/* Message d'interprétation (seulement si pression réelle saisie) */}
          {hasRealPressure ? (
            <div style={{
              padding: '12px',
              backgroundColor: pressureChange > 5 ? '#7f1d1d' : pressureChange > 2 ? '#92400e' : '#064e3b',
              border: `1px solid ${pressureChange > 5 ? '#dc2626' : pressureChange > 2 ? '#f59e0b' : '#10b981'}`,
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {pressureChange > 5 ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v4l2 2"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <strong>Écart important !</strong> La pression mesurée diffère de plus de 5% de la théorique. Vérifiez l'étanchéité du système.
                  </>
                ) : pressureChange > 2 ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v8M8 12h8"/>
                    </svg>
                    <strong>Écart modéré.</strong> La pression diffère de 2-5% de la théorique. Surveillance recommandée.
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <strong>Écart normal.</strong> La pression mesurée correspond bien à la théorique (écart &lt; 2%).
                  </>
                )}
              </div>
            </div>
          ) : (
            <div style={{
              padding: '12px',
              backgroundColor: '#1e3a8a',
              border: '1px solid #3b82f6',
              borderRadius: '6px'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <strong>Calcul théorique effectué.</strong> Saisissez la pression mesurée pour comparer avec la théorie.
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
