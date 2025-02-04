export interface FluidsInterface {
    name: string;
    ref_name: string;
    gwp: number;
    group: number;
    classification: string;
    critical_pres: number;
    critical_temp: number;
    triple_temp?: number;
    triple_pres?: number;
    can_simulate?: boolean;
}