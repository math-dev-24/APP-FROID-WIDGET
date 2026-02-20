import type { ConfigUnit } from "./settings";

export type StateType = "Liquide" | "Gaz" | "Trans-critique";
export type SatMode = 1 | 2;
export type DebitMode = 1 | 2;

export type SimpleApiInput = {
    fluid: string;
    state: StateType;
    debit: number;
    sat: number;
    t_product_c: number;
    debit_mode: DebitMode;
    sat_mode: SatMode;
};

export type SimplePayload = {
    config_unit: ConfigUnit;
    data: SimpleApiInput;
};

export type SimpleApiOutput = {
    fluid: string;
    state: StateType;
    p_sat: number;
    t_sat_liq: number;
    t_sat_vap: number;
    t_product: number;
    viscosity: number;
    density: number;
    h_tmp: number;
    q_vol_h: number;
};
