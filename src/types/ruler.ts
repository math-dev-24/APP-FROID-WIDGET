import type { ConfigUnit } from "./settings";

export type DataIntRuler = {
    fluid: string;
    need: string;
    car_1: string;
    car_2: string;
    value_1: number;
    value_2: number;
};

export type RulerPayload = {
    config_unit: ConfigUnit;
    data: DataIntRuler;
};

export type RulerMessage = {
    type: "RULER_REQUEST";
    data: RulerPayload;
};

export type FluidsMessage = {
    type: "FLUIDS_REQUEST";
};

export type SimpleMessage = {
    type: "SIMPLE_REQUEST";
    data: import("./simple").SimplePayload;
};

export type BackgroundMessage = RulerMessage | FluidsMessage | SimpleMessage;
